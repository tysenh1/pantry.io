import { describe, beforeEach, it, expect } from "vitest";
import { Recipe } from "../../../../../shared/types";
import { createRecipe } from "./recipeService";
import { createSchema } from "../../../seed/importSeed";
import { seedTestData } from "../../../seed/testSeed";
import Database from 'better-sqlite3';
import { type Database as Sqlite3Database } from 'better-sqlite3';
import fs from 'fs';

let db: Sqlite3Database;


describe('createRecipe()', () => {
  beforeEach(() => {
    db = new Database(':memory:')

    const schemaPath = '/home/tysenh1/Coding/pantry.io/apps/backend/';
    const schemaSql = fs.readFileSync(schemaPath + 'schema.sql', 'utf8');

    createSchema(db, schemaSql)

    seedTestData(db)
  })
  it('should create the recipe in the db when given a valid recipe', () => {
    const recipe: Recipe = {
      name: 'testRecipe3',
      instructions: 'This is the third test recipe.',
      tags: 'Test,3',
      ingredients: [
        {
          recipe_id: 'testRecipe3',
          pantry_id: 'testtest',
          quantity_needed: 2000,
          unit: 'g'
        }
      ]
    }

    createRecipe(recipe, db)

    const expectedRecipe = db.prepare('SELECT name, instructions, tags FROM recipes WHERE name = ?').get('testRecipe3')
    const expectedIngredient = db.prepare('SELECT * FROM recipe_ingredients WHERE pantry_id = ?').get('testtest')

    expect(expectedRecipe).toMatchObject({
      name: 'testRecipe3',
      instructions: 'This is the third test recipe.',
      tags: 'Test,3'
    })
    expect(expectedIngredient).toMatchObject({
      pantry_id: 'testtest',
      quantity_needed: 2000,
      unit: 'g'
    })
  })
})
