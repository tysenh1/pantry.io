import sqlite3 from 'sqlite3';
import { seedPantry, seedRecipes, seedRecipeIngredients, seedGenericNames } from './seedData.ts';
import path from 'path';
import fs from 'fs';

const db = new sqlite3.Database('./db.db');

// ✅ FIXED: Import seedRecipeIngredients from your seedData.ts
const schemaPath = '/home/tysenh1/Coding/pantry.io/apps/backend/';
const schemaSql = fs.readFileSync(schemaPath + 'schema.sql', 'utf8');

const runImport = () => {
  db.serialize(() => {
    console.log('🔄 Starting kitchen database seeding...');

    // 1. Drop and recreate tables
    db.run('DROP TABLE IF EXISTS recipe_ingredients');
    db.run('DROP TABLE IF EXISTS recipes');
    db.run('DROP TABLE IF EXISTS pantry');
    db.run('DROP TABLE IF EXISTS item')
    db.run('DROP TABLE IF EXISTS allergens');
    db.run('DROP TABLE IF EXISTS item_allergens');
    db.run('DROP TABLE IF EXISTS generic_name');

    // 2. ✅ FIXED: Execute schema FIRST (creates tables)
    db.exec(schemaSql);

    // 3. Insert Pantry
    const pantryStmt = db.prepare("INSERT INTO pantry (id, item_name, quantity, unit, is_staple, generic_name_id) VALUES (?, ?, ?, ?, ?, ?)");
    seedPantry.forEach(item => {
      pantryStmt.run(item.id, item.item_name, item.quantity, item.unit, item.is_staple, item.generic_name_id);
    });
    pantryStmt.finalize();

    // 4. Insert Recipes
    const recipeStmt = db.prepare("INSERT INTO recipes (id, name, instructions, ingredients, tags) VALUES (?, ?, ?, ?, ?)");
    seedRecipes.forEach(recipe => {
      recipeStmt.run(recipe.id, recipe.name, recipe.instructions, recipe.ingredients, recipe.tags);
    });
    recipeStmt.finalize();

    // 5. ✅ FIXED: Use seedRecipeIngredients array directly
    const ingredientStmt = db.prepare("INSERT INTO recipe_ingredients (id, ingredient_id, quantity_needed, unit) VALUES (?, ?, ?, ?)");
    seedRecipeIngredients.forEach(ing => {
      ingredientStmt.run(ing.recipe_id, ing.ingredient_id, ing.quantity_needed, ing.unit);
    });
    ingredientStmt.finalize();

    const genericNameStmt = db.prepare("INSERT INTO generic_name (id, generic_name) VALUES (?, ?)");
    seedGenericNames.forEach(name => {
      genericNameStmt.run(name.id, name.name);
    })
    genericNameStmt.finalize();

    console.log("✅ Database seeded successfully!");
    console.log(`📦 Pantry items: ${seedPantry.length}`);
    console.log(`🍳 Recipes: ${seedRecipes.length}`);
    console.log(`🔗 Recipe ingredients: ${seedRecipeIngredients.length}`);
  });

  db.close((err) => {
    if (err) {
      console.error('❌ Error closing db:', err.message);
    } else {
      console.log('🔒 Database connection closed.');
    }
  });


};

runImport();
