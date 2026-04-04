import { database } from '../config/db.ts';
import type { Database } from 'better-sqlite3';
import type { KitchenTools, QuantityUpdateInfo, RecipeBase, SubtractQuantitiesResult } from '../types.ts';
import type { Tool } from 'ollama';
import { CONVERSION_RATES, normalizeQuantity } from '../utils/itemUtils.ts';
export const toolsLogic: KitchenTools = {
  browseAllRecipes: ({ db = database }: { db: Database }) => {
    const sql = `
SELECT r.id, r.name, r.tags, ri.quantity_needed, ri.unit AS ingredient_unit, p.quantity AS pantry_quantity, g.primary_unit
FROM recipes r
JOIN recipe_ingredients ri ON r.id = ri.recipe_id
JOIN pantry p ON ri.pantry_id = p.id
JOIN generic_name g ON p.generic_name_id = g.id
`

    try {
      const recipesInfo = db.prepare(sql).all();
      const availableRecipes = normalizeRecipeQuantities(recipesInfo)

      // return JSON.stringify(availableRecipes || { error: "No available recipes in the db." })
      return JSON.stringify(availableRecipes.length >= 1 ? availableRecipes : { error: "No available recipes in the db." })
    } catch (err) {
      console.error(err)
      return JSON.stringify({ error: "An error occured while fetching recipes." })
    }
  },

  getRecipeDetails: ({ recipe_id, db = database }) => {
    const sql = `
SELECT r.id, r.name, r.instructions, r.tags,
GROUP_CONCAT(g.name || ':'
  || ri.quantity_needed || ' '
  || ri.unit, '; ') AS detailed_ingredients
FROM recipes r
LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
LEFT JOIN pantry p ON ri.pantry_id = p.id
LEFT JOIN generic_name g ON p.generic_name_id = g.id
WHERE r.id = ?
GROUP BY r.id, r.name, r.instructions, r.tags
`

    try {
      const recipe = db.prepare(sql).get(recipe_id)

      return JSON.stringify(recipe || { error: "Recipe not found in database." })
    } catch (err) {
      console.error(err)
      return JSON.stringify({ error: "An error occured while fetching the recipe." })
    }
  },

  subtractRecipeIngredientQuantities: ({ recipe_id, db = database }: { recipe_id: string, db: Database }) => {
    const sql = `
SELECT ri.pantry_id, ri.quantity_needed, ri.unit, g.primary_unit, g.weight_per_piece, g.name, p.quantity
FROM recipe_ingredients ri
JOIN pantry p ON ri.pantry_id = p.id
JOIN generic_name g ON p.generic_name_id = g.id
WHERE ri.recipe_id = ?
`
    const ingredients = db.prepare(sql).all(recipe_id) as {
      pantry_id: string,
      quantity_needed: number,
      unit: string,
      primary_unit: string,
      weight_per_piece: number,
      name: string,
      quantity: number
    }[]

    const newQuantityList = {}

    for (const ingredient of ingredients) {
      const quantityUpdateInfo: QuantityUpdateInfo = {
        quantity: ingredient.quantity,
        primary_unit: ingredient.primary_unit,
        weight_per_piece: ingredient.weight_per_piece
      }

      const newQuantity = subtractQuantity(quantityUpdateInfo, ingredient.quantity_needed, ingredient.unit)

      const newQuantityWithOldUnit = normalizeQuantity(newQuantity, ingredient.unit)

      try {
        db.prepare('UPDATE pantry SET quantity = ? WHERE id = ?').run(newQuantity, ingredient.pantry_id)
        newQuantityList[ingredient.name] = newQuantityWithOldUnit

      } catch (err) {
        return JSON.stringify({ error: 'An error occured while updated pantry quantities.' })
      }
    }

    return JSON.stringify(newQuantityList || { error: 'An error occured, no pantry items were updated.' })

  }
}

export function normalizeRecipeQuantities(recipes: any[]) {
  return recipes.filter(recipe => {
    const pantryQuantityInPrimaryUnit = normalizeQuantity(recipe.pantry_quantity, recipe.primary_unit)
    const neededQuantityInPrimaryUnit = normalizeQuantity(recipe.quantity_needed, recipe.ingredient_unit)

    return pantryQuantityInPrimaryUnit >= neededQuantityInPrimaryUnit;
  });
}

export const subtractQuantity = (info: QuantityUpdateInfo, unitSize: number, unitType: string) => {
  if (info.primary_unit === unitType) {
    return Math.floor(info.quantity - unitSize);
  }

  if (unitType === 'pcs' && info.primary_unit !== 'pcs') {
    const amountGrams = unitSize * (info.weight_per_piece ?? 0);
    const subtractInPrimary = normalizeQuantity(amountGrams, 'g', info.primary_unit);
    return Math.floor(info.quantity - subtractInPrimary);
  }

  if (unitType !== 'pcs' && info.primary_unit === 'pcs') {
    const amountGrams = info.quantity * info.weight_per_piece
    const amountToAdd = normalizeQuantity(unitSize, unitType, 'g')
    return Math.floor((amountGrams - amountToAdd) / info.weight_per_piece)
  }

  // General: Convert unitSize@unitType → primary_unit, then subtract
  const subtractInPrimary = normalizeQuantity(unitSize, unitType, info.primary_unit);
  return Math.floor(info.quantity - subtractInPrimary);
};

export const toolDefinitions: Tool[] = [
  {
    type: 'function',
    function: {
      name: 'browseAllRecipes',
      description: 'Returns a list of all recipe names/tags. Use this to find what to cook.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'getRecipeDetails',
      description: "Get full instructions. ONLY use this if you already have a recipe ID.",
      parameters: {
        type: 'object',
        properties: {
          recipe_id: {
            type: 'string',
            description: "The UUID of the recipe"
          }
        },
        required: ['recipe_id']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'subtractRecipeIngredientQuantities',
      description: 'Subtracts the ingredient quantities in the recipe from the pantry. ONLY use when the user selects a recipe to cook.',
      parameters: {
        type: 'object',
        properties: {
          recipe_id: {
            type: 'string',
            description: "The UUID of the recipe the user selects"
          }
        },
        required: ['recipe_id']
      }
    }
  }
];
