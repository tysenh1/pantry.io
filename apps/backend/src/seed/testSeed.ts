import type { GenericName, Pantry, Recipes, RecipeIngredients, Item } from '../api/v1/types'
import fs from 'fs';
// import { seedPantry, seedRecipes, seedRecipeIngredients, seedGenericNames, genericNameIds } from './seedData'
import Database from "better-sqlite3";

const schemaPath = '/home/tysenh1/Coding/pantry.io/apps/backend/';
const schemaSql = fs.readFileSync(schemaPath + 'schema.sql', 'utf8');
const db = new Database('/home/tysenh1/Coding/pantry.io/apps/backend/db.db');

export const seedTestData = (db) => {
  const genericNames: GenericName[] = [
    {
      id: 'testGrams1',
      name: "Grams1",
      primary_unit: 'g',
      weight_per_piece: 50
    },
    {
      id: 'testMl1',
      name: 'Ml1',
      primary_unit: 'ml',
      weight_per_piece: 1
    },
    {
      id: 'testPcs1',
      name: 'Pcs1',
      primary_unit: 'pcs',
      weight_per_piece: 50
    },


    {
      id: 'testGrams2',
      name: "Grams2",
      primary_unit: 'g',
      weight_per_piece: 50
    },
    {
      id: 'testMl2',
      name: 'Ml2',
      primary_unit: 'ml',
      weight_per_piece: 1
    },
    {
      id: 'testPcs2',
      name: 'Pcs2',
      primary_unit: 'pcs',
      weight_per_piece: 50
    },
  ]

  const pantryItems: Pantry[] = [
    {
      id: 'testGrams1',
      generic_name_id: 'testGrams1',
      quantity: 100,
      is_staple: 0
    },
    {
      id: 'testMl1',
      generic_name_id: 'testMl1',
      quantity: 100,
      is_staple: 0
    },
    {
      id: 'testPcs1',
      generic_name_id: 'testPcs1',
      quantity: 2,
      is_staple: 0
    },
    {
      id: 'testtest',
      generic_name_id: 'testGrams2',
      quantity: 1,
      is_staple: 0
    }
  ]

  const items: Item[] = [
    {
      id: 'testItem1',
      barcode: 'testItem1',
      product_name: 'Test Item 1',
      generic_name_id: 'testGrams1',
      unit_size: 200,
      unit_type: 'g'
    }
  ]

  const recipes: Recipes[] = [
    {
      id: 'testRecipe1',
      name: 'Test Recipe 1',
      instructions: 'This is the first test recipe.',
      tags: 'Test,1'
    },
    {
      id: 'testRecipe2',
      name: 'Test Recipe 2',
      instructions: 'This is the second test recipe.',
      tags: 'Test,2'
    }
  ]

  const recipeIngredients: RecipeIngredients[] = [
    {
      recipe_id: 'testRecipe1',
      pantry_id: 'testGrams1',
      quantity_needed: 10,
      unit: 'g'
    },


    {
      recipe_id: 'testRecipe2',
      pantry_id: 'testPcs1',
      quantity_needed: 1000000,
      unit: 'pcs'
    }
  ]


  const genericNameStmt = db.prepare("INSERT INTO generic_name (id, name, primary_unit, weight_per_piece) VALUES (?, ?, ?, ?)")
  for (const name of genericNames) {
    genericNameStmt.run(name.id, name.name, name.primary_unit, name.weight_per_piece)
  }

  const pantryStmt = db.prepare("INSERT INTO pantry (id, generic_name_id, quantity, is_staple) VALUES (?, ?, ?, ?)")
  for (const item of pantryItems) {
    pantryStmt.run(item.id, item.generic_name_id, item.quantity, item.is_staple)
  }

  const itemStmt = db.prepare("INSERT INTO item (id, barcode, product_name, generic_name_id, unit_size, unit_type) VALUES (?, ?, ? ,?, ? ,?)")
  for (const item of items) {
    itemStmt.run(item.id, item.barcode, item.product_name, item.generic_name_id, item.unit_size, item.unit_type)
  }

  const recipeStmt = db.prepare("INSERT INTO recipes (id, name, instructions, tags) VALUES (?, ?, ?, ?)")
  for (const recipe of recipes) {
    recipeStmt.run(recipe.id, recipe.name, recipe.instructions, recipe.tags)
  }

  const recipeIngredientsStmt = db.prepare("INSERT INTO recipe_ingredients (recipe_id, pantry_id, quantity_needed, unit) VALUES (?, ?, ?, ?)")
  for (const ingredient of recipeIngredients) {
    recipeIngredientsStmt.run(ingredient.recipe_id, ingredient.pantry_id, ingredient.quantity_needed, ingredient.unit)
  }

}

