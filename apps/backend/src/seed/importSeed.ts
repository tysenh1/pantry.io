import sqlite3 from 'better-sqlite3';
import { seedPantry, seedRecipes, seedRecipeIngredients, seedGenericNames, genericNameIds } from './seedData.ts';
import path from 'path';
import fs from 'fs';

const db = sqlite3('/home/tysenh1/Coding/pantry.io/apps/backend/db.db');

const schemaPath = '/home/tysenh1/Coding/pantry.io/apps/backend/';
const schemaSql = fs.readFileSync(schemaPath + 'schema.sql', 'utf8');

// db.pragma('foreign_keys = FALSE')

const runImport = db.transaction(() => {
  console.log('🔄 Starting kitchen database seeding...');  // 1. Drop and recreate tables

  db.exec('DROP TABLE IF EXISTS item;');
  db.exec('DROP TABLE IF EXISTS item_allergens;');
  db.exec('DROP TABLE IF EXISTS pantry;');
  db.exec('DROP TABLE IF EXISTS recipe_ingredients;');
  db.exec('DROP TABLE IF EXISTS recipes;');
  db.exec('DROP TABLE IF EXISTS allergens;');
  db.exec('DROP TABLE IF EXISTS generic_name;');

  db.exec(schemaSql);

  const genericNameStmt = db.prepare("INSERT INTO generic_name (id, name, primary_unit, weight_per_piece) VALUES (?, ?, ?, ?)");
  for (const name of seedGenericNames) {
    genericNameStmt.run(name.id, name.name, name.primary_unit, name.weight_per_piece);
  }

  const pantryStmt = db.prepare("INSERT INTO pantry (id, generic_name_id, quantity, is_staple) VALUES (?, ?, ?, ?)");
  for (const item of seedPantry) {
    pantryStmt.run(item.id, item.generic_name_id, item.quantity, item.is_staple);
  }

  const recipeStmt = db.prepare("INSERT INTO recipes (id, name, instructions, ingredients, tags) VALUES (?, ?, ?, ?, ?)");
  for (const recipe of seedRecipes) {
    recipeStmt.run(recipe.id, recipe.name, recipe.instructions, recipe.ingredients, recipe.tags);
  }

  const ingredientStmt = db.prepare("INSERT INTO recipe_ingredients (id, ingredient_id, quantity_needed, unit) VALUES (?, ?, ?, ?)");
  for (const ing of seedRecipeIngredients) {
    ingredientStmt.run(ing.recipe_id, ing.ingredient_id, ing.quantity_needed, ing.unit);
  }

  // db.prepare("INSERT INTO item (id, barcode, product_name, generic_name_id, unit_size, unit_type) VALUES (?, ?, ?, ?, ?, ?)")
  // .run("THISISAUUID", "0068437389693", "Açai & blueberry flavours", genericNameIds.chocolate, 850, "g");


  console.log("✅ Database seeded successfully!");
  console.log(`📦 Pantry items: ${seedPantry.length}`);
  console.log(`🍳 Recipes: ${seedRecipes.length}`);
  console.log(`🔗 Recipe ingredients: ${seedRecipeIngredients.length}`);

});

runImport();

db.close();
