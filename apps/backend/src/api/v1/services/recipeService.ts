import { Recipe } from "../../../../../shared/types";
import { randomUUID } from 'crypto'
import { database } from "../config/db";


export const createRecipe = (recipe: Recipe, db = database): void => {
  const recipeId = randomUUID();
  const recipeSql = `
INSERT INTO recipes (id, name, instructions, tags)
VALUES (?, ?, ?, ?);
`
  const cleanedTags = recipe.tags
    .trim()
    .replace(' ', '')

  const recipeParams = [
    recipeId,
    recipe.name,
    recipe.instructions,
    cleanedTags
  ]

  try {
    db.prepare(recipeSql).run(recipeParams)
  } catch (err) {
    console.error("DB Error:", err)
    throw new Error(err.message)
  }

  for (const ingredient of recipe.ingredients) {
    const ingredientSql = `
INSERT INTO recipe_ingredients (recipe_id, pantry_id, quantity_needed, unit)
VALUES (?, ?, ?, ?);
`
    const ingredientParams = [
      recipeId,
      ingredient.pantry_id,
      ingredient.quantity_needed,
      ingredient.unit
    ]

    try {
      db.prepare(ingredientSql).run(ingredientParams)
    } catch (err) {
      console.error("DB Error:", err)
      throw new Error(err.message)
    }

  }


}
