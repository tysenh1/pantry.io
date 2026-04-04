import { describe, it, beforeEach, expect } from "vitest";
import fs from 'fs';
import Database from 'better-sqlite3';
import { type Database as Sqlite3Database } from 'better-sqlite3';
import { normalizeRecipeQuantities, subtractQuantity, toolsLogic } from "./toolService";
import { createSchema } from "../../../seed/importSeed";
import { seedTestData } from "../../../seed/testSeed";
import { QuantityUpdateInfo } from "../types";

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

describe('normalizeRecipeQuantities()', () => {
  describe('when pantry quantity is greater than the needed quantity', () => {
    it('should return all recipes when both units are grams', () => {
      const recipes = [
        {
          pantry_quantity: 500,
          primary_unit: 'g',
          quantity_needed: 200,
          ingredient_unit: 'g'
        },
        {
          pantry_quantity: 100,
          primary_unit: 'g',
          quantity_needed: 10,
          ingredient_unit: 'g'
        }
      ]

      const result = normalizeRecipeQuantities(recipes)

      expect(result).toMatchObject(recipes)
    })

    it('should return all recipes when pantry is grams and ingredient is not grams', () => {
      const recipes = [
        {
          pantry_quantity: 500,
          primary_unit: 'g',
          quantity_needed: 10,
          ingredient_unit: 'oz'
        },
        {
          pantry_quantity: 1000,
          primary_unit: 'g',
          quantity_needed: 1,
          ingredient_unit: 'lb'
        }
      ]

      const result = normalizeRecipeQuantities(recipes)

      expect(result).toMatchObject(recipes)
    })

    it('should return all recipes when pantry is not grams and ingredient is grams', () => {
      const recipes = [
        {
          pantry_quantity: 500,
          primary_unit: 'kg',
          quantity_needed: 200,
          ingredient_unit: 'g'
        },
        {
          pantry_quantity: 100,
          primary_unit: 'oz',
          quantity_needed: 10,
          ingredient_unit: 'g'
        }
      ]

      const result = normalizeRecipeQuantities(recipes)

      expect(result).toMatchObject(recipes)
    })

    it('should return all recipes when neither unit is grams', () => {
      const recipes = [
        {
          pantry_quantity: 500,
          primary_unit: 'lb',
          quantity_needed: 200,
          ingredient_unit: 'oz'
        },
        {
          pantry_quantity: 100,
          primary_unit: 'kg',
          quantity_needed: 10,
          ingredient_unit: 'oz'
        }
      ]

      const result = normalizeRecipeQuantities(recipes)

      expect(result).toMatchObject(recipes)
    })
  })

  describe('when one ingredient quantity is greater than pantry quantity', () => {
    it('should return one recipe when both units are grams', () => {
      const recipes = [
        {
          pantry_quantity: 500,
          primary_unit: 'g',
          quantity_needed: 200,
          ingredient_unit: 'g'
        },
        {
          pantry_quantity: 100,
          primary_unit: 'g',
          quantity_needed: 1000,
          ingredient_unit: 'g'
        }
      ]

      const result = normalizeRecipeQuantities(recipes)

      expect(result).toMatchObject([recipes[0]])
    })

    it('should return one recipe when pantry is grams and ingredient is not grams', () => {
      const recipes = [
        {
          pantry_quantity: 500,
          primary_unit: 'g',
          quantity_needed: 10,
          ingredient_unit: 'oz'
        },
        {
          pantry_quantity: 1000,
          primary_unit: 'g',
          quantity_needed: 10,
          ingredient_unit: 'lb'
        }
      ]

      const result = normalizeRecipeQuantities(recipes)

      expect(result).toMatchObject([recipes[0]])
    })

    it('should return one recipe when pantry is not grams and ingredient is grams', () => {
      const recipes = [
        {
          pantry_quantity: 500,
          primary_unit: 'kg',
          quantity_needed: 200,
          ingredient_unit: 'g'
        },
        {
          pantry_quantity: 100,
          primary_unit: 'oz',
          quantity_needed: 10000000,
          ingredient_unit: 'g'
        }
      ]

      const result = normalizeRecipeQuantities(recipes)

      expect(result).toMatchObject([recipes[0]])
    })

    it('should return one recipe when neither unit is grams', () => {
      const recipes = [
        {
          pantry_quantity: 500,
          primary_unit: 'lb',
          quantity_needed: 200,
          ingredient_unit: 'oz'
        },
        {
          pantry_quantity: 100,
          primary_unit: 'kg',
          quantity_needed: 10000000,
          ingredient_unit: 'oz'
        }
      ]

      const result = normalizeRecipeQuantities(recipes)

      expect(result).toMatchObject([recipes[0]])
    })
  })
})

describe('subtractQuantity()', () => {
  describe('when unitType equals info.primary_unit', () => {
    it('subtracts grams quantity correctly', () => {
      const info = {
        primary_unit: 'g',
        quantity: 200
      }

      const unitType = 'g'
      const unitSize = 150

      const result = subtractQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(50)
    })

    it('subtracts ounces quantity correctly', () => {
      const info = {
        primary_unit: 'oz',
        quantity: 15
      }
      const unitType = 'oz'
      const unitSize = 4

      const result = subtractQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(11)
    })
  })

  describe("when unitType doesn't equal info.primary_unit", () => {
    it('subtracts grams and ounces correctly', () => {
      const info = {
        primary_unit: 'g',
        quantity: 264
      }
      const unitType = 'oz'
      const unitSize = 4

      const result = subtractQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(150)
    })

    it('subtracts grams and kg correctly', () => {
      const info = {
        primary_unit: 'g',
        quantity: 2150
      }
      const unitType = 'kg'
      const unitSize = 2

      const result = subtractQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(150)
    })

    it('subtracts ml and fluid ounces correctly', () => {
      const info = {
        primary_unit: 'ml',
        quantity: 314
      }
      const unitType = 'fl_oz'
      const unitSize = 4

      const result = subtractQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(200)
    })

    it('subtracts pcs and grams', () => {
      const info = {
        primary_unit: 'pcs',
        quantity: 14,
        weight_per_piece: 50
      }
      const unitType = 'g'
      const unitSize = 200

      const result = subtractQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(10)
    })

    it('subtracts pcs and ounces', () => {
      const info = {
        primary_unit: 'pcs',
        quantity: 13,
        weight_per_piece: 50
      }
      const unitType = 'oz'
      const unitSize = 5

      const result = subtractQuantity(info as QuantityUpdateInfo, unitSize, unitType)

      expect(result).toBe(10)
    })
  })
})
