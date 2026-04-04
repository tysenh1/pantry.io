import { describe, it, beforeEach, expect } from "vitest";
import fs from 'fs';
import Database from 'better-sqlite3';
import { type Database as Sqlite3Database } from 'better-sqlite3';
import { toolsLogic } from "./toolService";
import { createSchema } from "../../../seed/importSeed";
import { seedTestData } from "../../../seed/testSeed";

let db: Sqlite3Database

describe('browseAllRecipes()', () => {
  beforeEach(() => {
    db = new Database(':memory:')

    const schemaPath = '/home/tysenh1/Coding/pantry.io/apps/backend/';
    const schemaSql = fs.readFileSync(schemaPath + 'schema.sql', 'utf8');

    createSchema(db, schemaSql)

    seedTestData(db)
  })
  it('should return all recipes in the db', () => {
    const result = toolsLogic.browseAllRecipes({ db: db })

    const expected = [
      {
        id: 'testRecipe1',
        name: 'Test Recipe 1',
        tags: 'Test,1',
        quantity_needed: 10,
        ingredient_unit: 'g',
        pantry_quantity: 100,
        primary_unit: 'g'
      }

    ]

    expect(JSON.stringify(expected)).toMatch(result)
  })

  it('should return an error when no recipes are found', () => {
    db.prepare('UPDATE recipe_ingredients SET quantity_needed = ? WHERE pantry_id = ? AND recipe_id = ?').run(20000, 'testGrams1', 'testRecipe1')

    const expected = {
      error: "No available recipes in the db."
    }

    const result = toolsLogic.browseAllRecipes({ db: db })

    expect(result).toMatch(JSON.stringify(expected))
  })
})

describe('getRecipeDetails()', () => {
  beforeEach(() => {
    db = new Database(':memory:')

    const schemaPath = '/home/tysenh1/Coding/pantry.io/apps/backend/';
    const schemaSql = fs.readFileSync(schemaPath + 'schema.sql', 'utf8');

    createSchema(db, schemaSql)

    seedTestData(db)
  })
  it('should return the recipe details when given a valid recipe_id', () => {
    const recipeId = 'testRecipe1'
    const expected = {
      id: 'testRecipe1',
      name: 'Test Recipe 1',
      instructions: 'This is the first test recipe.',
      tags: 'Test,1',
      detailed_ingredients: 'Grams1:10 g'
    }

    const result = toolsLogic.getRecipeDetails({ recipe_id: recipeId, db: db })

    expect(result).toMatch(JSON.stringify(expected))
  })

  it("should return an error if the recipe doesn't exist", () => {
    const recipeId = 'rsdg;rasdgh'

    const expected = {
      error: 'Recipe not found in database.'
    }

    const result = toolsLogic.getRecipeDetails({ recipe_id: recipeId, db: db })

    expect(result).toMatch(JSON.stringify(expected))
  })
})

describe('subtractRecipeIngredientQuantities()', () => {
  beforeEach(() => {
    db = new Database(':memory:')

    const schemaPath = '/home/tysenh1/Coding/pantry.io/apps/backend/';
    const schemaSql = fs.readFileSync(schemaPath + 'schema.sql', 'utf8');

    createSchema(db, schemaSql)

    seedTestData(db)
  })
  it('should subtract the quantity needed from the pantry for each ingredient', () => {
    const recipeId = 'testRecipe1'
    const expected = {
      'Grams1': 90
    }

    const result = toolsLogic.subtractRecipeIngredientQuantities({ recipe_id: recipeId, db: db })
    const pantryResult = db.prepare('SELECT quantity FROM pantry WHERE generic_name_id = ?').get('testGrams1') as { quantity: number }

    expect(result).toMatch(JSON.stringify(expected))
    expect(pantryResult.quantity).toBe(90)
  })
})

describe('convertToPrimaryUnits()', () => { })

describe('normalizeRecipeQuantities()', () => { })

describe('subtractQuantity()', () => { })
