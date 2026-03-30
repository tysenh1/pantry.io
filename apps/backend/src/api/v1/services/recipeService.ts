import { Recipe } from "../../../../../shared/types";
import { randomUUID } from 'crypto'
import { db } from "../config/db";


export const createRecipe = async (recipe: Recipe): Promise<void> => {
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
    await db.prepare(recipeSql).run(recipeParams)
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
      ingredient.id,
      ingredient.quantityNeeded,
      ingredient.unit
    ]

    try {
      await db.prepare(ingredientSql).run(ingredientParams)
    } catch (err) {
      console.error("DB Error:", err)
      throw new Error(err.message)
    }

  }


}
