import { v4 as uuidv4 } from 'uuid';
import type { GenericName, Pantry, Recipes, RecipeIngredients } from '../api/v1/types'
import type { Item } from '../../../shared/types';

// Fixed IDs object - using pantry item names as keys for proper mapping
const recipeIds = {
  // Recipes keep their IDs
  chicken: uuidv4(),
  pasta: uuidv4(),
  tacos: uuidv4(),
  stirfry: uuidv4(),
  salad: uuidv4(),
  steak: uuidv4(),
  curry: uuidv4(),
  pizza: uuidv4(),
  pancakes: uuidv4(),
  chili: uuidv4(),
  sushi: uuidv4(),
  lasagna: uuidv4(),
  stirfryVeg: uuidv4(),
  quesadilla: uuidv4(),
  friedRice: uuidv4(),
  omelette: uuidv4(),
  padthai: uuidv4(),
  burgers: uuidv4(),
  soup: uuidv4(),
  cookies: uuidv4(),
};

const ingredientIds = {
  chickenBreast: uuidv4(),
  groundBeef: uuidv4(),
  eggs: uuidv4(),
  salmonFillet: uuidv4(),
  shrimp: uuidv4(),
  spaghetti: uuidv4(),
  whiteRice: uuidv4(),
  tortilla: uuidv4(),
  brownRice: uuidv4(),
  breadSlice: uuidv4(),
  lasangaNoodle: uuidv4(),
  garlic: uuidv4(),
  onion: uuidv4(),
  bellPepper: uuidv4(),
  broccoli: uuidv4(),
  spinach: uuidv4(),
  carrot: uuidv4(),
  tomato: uuidv4(),
  mushroom: uuidv4(),
  zucchini: uuidv4(),
  oliveOil: uuidv4(),
  soySauce: uuidv4(),
  butter: uuidv4(),
  cheddarCheese: uuidv4(),
  milk: uuidv4(),
  flour: uuidv4(),
  sugar: uuidv4(),
  honey: uuidv4(),
  tomatoSauce: uuidv4(),
  coconutMilk: uuidv4(),
  redCurryPaste: uuidv4(),
  beefSteak: uuidv4(),
  mozzarellaCheese: uuidv4(),
  bakingPowder: uuidv4(),
  noriSheets: uuidv4(),
  avocado: uuidv4(),
  peanutButter: uuidv4(),
  lime: uuidv4(),
  bun: uuidv4(),
  chocolate: uuidv4()
}

export const genericNameIds = {
  // Essential Proteins
  chicken: uuidv4(),
  beef: uuidv4(),
  pork: uuidv4(),
  salmon: uuidv4(),
  shrimp: uuidv4(),
  eggs: uuidv4(),
  tofu: uuidv4(),
  turkey: uuidv4(),
  lamb: uuidv4(),
  sausage: uuidv4(),
  bacon: uuidv4(),

  // Essential Dairy
  milk: uuidv4(),
  butter: uuidv4(),
  cheddarCheese: uuidv4(),
  mozzarellaCheese: uuidv4(),
  yogurt: uuidv4(),
  cream: uuidv4(),
  sour_cream: uuidv4(),
  cream_cheese: uuidv4(),
  parmesan: uuidv4(),

  // Produce Essentials
  onion: uuidv4(),
  garlic: uuidv4(),
  potato: uuidv4(),
  tomato: uuidv4(),
  carrot: uuidv4(),
  celery: uuidv4(),
  bell_pepper: uuidv4(),
  broccoli: uuidv4(),
  spinach: uuidv4(),
  lettuce: uuidv4(),
  cucumber: uuidv4(),
  zucchini: uuidv4(),
  mushroom: uuidv4(),
  cabbage: uuidv4(),
  ginger: uuidv4(),
  avocado: uuidv4(),
  apple: uuidv4(),
  banana: uuidv4(),
  lemon: uuidv4(),
  lime: uuidv4(),

  // Grains & Pasta
  whiteRice: uuidv4(),
  brownRice: uuidv4(),
  flour: uuidv4(),
  spaghettiNoodle: uuidv4(),
  lasagnaNoodle: uuidv4(),
  bread: uuidv4(),
  oats: uuidv4(),
  quinoa: uuidv4(),
  tortilla: uuidv4(),
  breadcrumbs: uuidv4(),

  // Condiments & Oils
  olive_oil: uuidv4(),
  vegetable_oil: uuidv4(),
  soy_sauce: uuidv4(),
  vinegar: uuidv4(),
  ketchup: uuidv4(),
  mustard: uuidv4(),
  mayonnaise: uuidv4(),
  hot_sauce: uuidv4(),
  honey: uuidv4(),
  maple_syrup: uuidv4(),

  // Spices & Baking
  salt: uuidv4(),
  black_pepper: uuidv4(),
  sugar: uuidv4(),
  brown_sugar: uuidv4(),
  baking_powder: uuidv4(),
  baking_soda: uuidv4(),
  yeast: uuidv4(),
  vanilla: uuidv4(),
  cinnamon: uuidv4(),
  cumin: uuidv4(),
  paprika: uuidv4(),
  chili_powder: uuidv4(),
  oregano: uuidv4(),

  // Niche/Canned/Frozen
  chickpeas: uuidv4(),
  black_beans: uuidv4(),
  lentils: uuidv4(),
  coconut_milk: uuidv4(),
  tomato_sauce: uuidv4(),
  broth: uuidv4(),
  peanut_butter: uuidv4(),
  corn: uuidv4(),
  peas: uuidv4(),
  artichoke: uuidv4(),
  chocolate: uuidv4(),
  bun: uuidv4(),
  steak: uuidv4()
};

export const seedGenericNames: GenericName[] = [
  // Proteins
  { id: genericNameIds.chicken, name: 'Chicken', primary_unit: 'g', weight_per_piece: 200 },
  { id: genericNameIds.beef, name: 'Beef', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.pork, name: 'Pork', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.salmon, name: 'Fish', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.shrimp, name: 'Shrimp', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.eggs, name: 'Eggs', primary_unit: 'pcs', weight_per_piece: 50 },
  { id: genericNameIds.tofu, name: 'Tofu', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.turkey, name: 'Turkey', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.lamb, name: 'Lamb', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.sausage, name: 'Sausage', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.bacon, name: 'Bacon', primary_unit: 'g', weight_per_piece: 1 },

  // Dairy
  { id: genericNameIds.milk, name: 'Milk', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.butter, name: 'Butter', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cheddarCheese, name: 'Cheddar Cheese', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.mozzarellaCheese, name: 'Mozzarella Cheese', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.yogurt, name: 'Yogurt', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cream, name: 'Cream', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.sour_cream, name: 'Sour Cream', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cream_cheese, name: 'Cream Cheese', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.parmesan, name: 'Parmesan', primary_unit: 'g', weight_per_piece: 1 },

  // Produce
  { id: genericNameIds.onion, name: 'Onion', primary_unit: 'pcs', weight_per_piece: 50 },
  { id: genericNameIds.garlic, name: 'Garlic', primary_unit: 'pcs', weight_per_piece: 50 },
  { id: genericNameIds.potato, name: 'Potato', primary_unit: 'pcs', weight_per_piece: 100 },
  { id: genericNameIds.tomato, name: 'Tomato', primary_unit: 'pcs', weight_per_piece: 50 },
  { id: genericNameIds.carrot, name: 'Carrot', primary_unit: 'pcs', weight_per_piece: 100 },
  { id: genericNameIds.bell_pepper, name: 'Bell Pepper', primary_unit: 'pcs', weight_per_piece: 100 },
  { id: genericNameIds.broccoli, name: 'Broccoli', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.spinach, name: 'Spinach', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.lettuce, name: 'Lettuce', primary_unit: 'pcs', weight_per_piece: 150 },
  { id: genericNameIds.cucumber, name: 'Cucumber', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.zucchini, name: 'Zucchini', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.mushroom, name: 'Mushroom', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cabbage, name: 'Cabbage', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.ginger, name: 'Ginger', primary_unit: 'pcs', weight_per_piece: 50 },
  { id: genericNameIds.avocado, name: 'Avocado', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.apple, name: 'Apple', primary_unit: 'pcs', weight_per_piece: 150 },
  { id: genericNameIds.banana, name: 'Banana', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.lemon, name: 'Lemon', primary_unit: 'pcs', weight_per_piece: 150 },
  { id: genericNameIds.lime, name: 'Lime', primary_unit: 'pcs', weight_per_piece: 150 },

  // Pantry
  { id: genericNameIds.whiteRice, name: 'White Rice', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.brownRice, name: "Brown Rice", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.flour, name: 'Flour', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.spaghettiNoodle, name: 'Spaghetti Noodles', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.lasagnaNoodle, name: 'Lasagna Noodles', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.bread, name: "Bread", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.oats, name: 'Oats', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.quinoa, name: 'Quinoa', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.tortilla, name: 'Tortilla', primary_unit: 'pcs', weight_per_piece: 100 },
  { id: genericNameIds.breadcrumbs, name: 'Breadcrumbs', primary_unit: 'g', weight_per_piece: 1 },


  { id: genericNameIds.olive_oil, name: 'Olive Oil', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.vegetable_oil, name: "Vegetable Oil", primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.soy_sauce, name: "Soy Sauce", primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.vinegar, name: "Vinegar", primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.ketchup, name: 'Ketchup', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.mustard, name: 'Mustard', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.mayonnaise, name: "Mayonnaise", primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.hot_sauce, name: "Hot Sauce", primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.honey, name: "Honey", primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.maple_syrup, name: "Maple Syrup", primary_unit: 'ml', weight_per_piece: 1 },


  { id: genericNameIds.salt, name: 'Salt', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.black_pepper, name: "Black Pepper", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.sugar, name: 'Sugar', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.brown_sugar, name: "Brown Sugar", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.baking_powder, name: "Baking Powder", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.baking_soda, name: "Baking Soda", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.yeast, name: "Yeast", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.vanilla, name: "Vanilla", primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.cinnamon, name: "Cinnamon", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cumin, name: "Cumin", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.paprika, name: "Paprika", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.chili_powder, name: "Chili Powder", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.oregano, name: "Oregano", primary_unit: 'g', weight_per_piece: 1 },


  { id: genericNameIds.chickpeas, name: 'Chickpeas', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.black_beans, name: "Black Beans", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.lentils, name: "Lentils", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.coconut_milk, name: 'Coconut Milk', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.tomato_sauce, name: "Tomato Sauce", primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.broth, name: "Broth", primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.peanut_butter, name: "Peanut Butter", primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.corn, name: "Corn", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.peas, name: "Peas", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.artichoke, name: "Artichoke", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.chocolate, name: "Chocolate", primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.bun, name: "Bun", primary_unit: 'pcs', weight_per_piece: 100 },
  { id: genericNameIds.steak, name: 'Steak', primary_unit: 'g', weight_per_piece: 400 }
];

// Track ingredient-to-pantry-ID mapping for recipe_ingredients table
const ingredientToPantryId: Record<string, string> = {};

export const seedPantry: Pantry[] = [
  // ALL pantry items with FIXED IDs that match recipe mappedIngredients
  { id: ingredientIds.chickenBreast, item_name: 'Chicken Breast', quantity: 1000, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.chicken },
  { id: ingredientIds.groundBeef, item_name: 'Ground Beef', quantity: 500, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.beef },
  { id: ingredientIds.eggs, item_name: 'Eggs', quantity: 12, unit: 'pcs', is_staple: 1, generic_name_id: genericNameIds.eggs },
  { id: ingredientIds.salmonFillet, item_name: 'Salmon Fillet', quantity: 300, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.salmon },
  { id: ingredientIds.shrimp, item_name: 'Shrimp', quantity: 200, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.shrimp },
  { id: ingredientIds.spaghetti, item_name: 'Spaghetti', quantity: 500, unit: 'g', is_staple: 1, generic_name_id: genericNameIds.spaghettiNoodle },
  { id: ingredientIds.whiteRice, item_name: 'White Rice', quantity: 2, unit: 'kg', is_staple: 1, generic_name_id: genericNameIds.whiteRice },
  { id: ingredientIds.tortilla, item_name: 'Tortillas', quantity: 8, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.tortilla },
  { id: ingredientIds.brownRice, item_name: 'Brown Rice', quantity: 1, unit: 'kg', is_staple: 1, generic_name_id: genericNameIds.brownRice },
  { id: ingredientIds.breadSlice, item_name: 'Bread Slices', quantity: 20, unit: 'pcs', is_staple: 1, generic_name_id: genericNameIds.bread },
  { id: ingredientIds.lasangaNoodle, item_name: 'Lasagna Noodles', quantity: 400, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.lasagnaNoodle },
  { id: ingredientIds.garlic, item_name: 'Garlic', quantity: 5, unit: 'cloves', is_staple: 1, generic_name_id: genericNameIds.garlic },
  { id: ingredientIds.onion, item_name: 'Onion', quantity: 2, unit: 'pcs', is_staple: 1, generic_name_id: genericNameIds.onion },
  { id: ingredientIds.bellPepper, item_name: 'Bell Peppers', quantity: 3, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.bell_pepper },
  { id: ingredientIds.broccoli, item_name: 'Broccoli', quantity: 1, unit: 'head', is_staple: 0, generic_name_id: genericNameIds.broccoli },
  { id: ingredientIds.spinach, item_name: 'Spinach', quantity: 200, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.spinach },
  { id: ingredientIds.carrot, item_name: 'Carrots', quantity: 5, unit: 'pcs', is_staple: 1, generic_name_id: genericNameIds.carrot },
  { id: ingredientIds.tomato, item_name: 'Tomatoes', quantity: 6, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.tomato },
  { id: ingredientIds.mushroom, item_name: 'Mushrooms', quantity: 200, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.mushroom },
  { id: ingredientIds.zucchini, item_name: 'Zucchini', quantity: 3, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.zucchini },
  { id: ingredientIds.oliveOil, item_name: 'Olive Oil', quantity: 1, unit: 'L', is_staple: 1, generic_name_id: genericNameIds.olive_oil },
  { id: ingredientIds.soySauce, item_name: 'Soy Sauce', quantity: 250, unit: 'ml', is_staple: 1, generic_name_id: genericNameIds.soy_sauce },
  { id: ingredientIds.butter, item_name: 'Butter', quantity: 250, unit: 'g', is_staple: 1, generic_name_id: genericNameIds.butter },
  { id: ingredientIds.cheddarCheese, item_name: 'Cheddar Cheese', quantity: 200, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.cheddarCheese },
  { id: ingredientIds.milk, item_name: 'Milk', quantity: 2, unit: 'L', is_staple: 1, generic_name_id: genericNameIds.milk },
  { id: ingredientIds.flour, item_name: 'Flour', quantity: 2, unit: 'kg', is_staple: 1, generic_name_id: genericNameIds.flour },
  { id: ingredientIds.sugar, item_name: 'Sugar', quantity: 1, unit: 'kg', is_staple: 1, generic_name_id: genericNameIds.sugar },
  { id: ingredientIds.honey, item_name: 'Honey', quantity: 500, unit: 'g', is_staple: 1, generic_name_id: genericNameIds.honey },
  { id: ingredientIds.tomatoSauce, item_name: 'Tomato Sauce', quantity: 800, unit: 'g', is_staple: 1, generic_name_id: genericNameIds.tomato_sauce },
  // MISSING INGREDIENTS NOW PROPERLY ADDED
  { id: ingredientIds.coconutMilk, item_name: 'Coconut Milk', quantity: 0, unit: 'ml', is_staple: 0, generic_name_id: genericNameIds.coconut_milk },
  { id: ingredientIds.beefSteak, item_name: 'Beef Steak', quantity: 0, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.steak },
  { id: ingredientIds.mozzarellaCheese, item_name: 'Mozzarella Cheese', quantity: 0, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.mozzarellaCheese },
  { id: ingredientIds.bakingPowder, item_name: 'Baking Powder', quantity: 0, unit: 'tsp', is_staple: 0, generic_name_id: genericNameIds.baking_powder },
  { id: ingredientIds.avocado, item_name: 'Avocado', quantity: 0, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.avocado },
  { id: ingredientIds.peanutButter, item_name: 'Peanut Butter', quantity: 0, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.peanut_butter },
  { id: ingredientIds.lime, item_name: 'Lime', quantity: 0, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.lime },
  { id: ingredientIds.bun, item_name: 'Bun', quantity: 0, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.bun },
  { id: ingredientIds.chocolate, item_name: "Chocolate Snacks", quantity: 0, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.chocolate }
].map(item => {
  ingredientToPantryId[item.item_name] = item.id;
  return item;
});

export const seedRecipes = [
  // ALL YOUR RECIPES WITH mappedIngredients INTACT (exactly as you had them)
  {
    id: recipeIds.chicken,
    name: "Garlic Butter Chicken",
    tags: "Quick, High Protein, Low Carb",
    instructions: "1. Dice chicken into bite-sized pieces. 2. Sauté minced garlic in butter and oil. 3. Add chicken and cook until golden brown.",
    ingredients: "Chicken Breast, Garlic, Butter, Olive Oil",
    mappedIngredients: [  // <-- KEEPING EXACTLY AS IS
      { name: "Chicken Breast", qty: 500, unit: "g" },
      { name: "Garlic", qty: 3, unit: "cloves" },
      { name: "Butter", qty: 30, unit: "g" },
      { name: "Olive Oil", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: recipeIds.tacos,
    name: "Beef Tacos",
    tags: "Mexican, Family Style, Quick",
    ingredients: "Ground Beef, Tortillas, Onion, Cheddar Cheese",
    instructions: "1. Brown the beef with diced onions. 2. Warm the tortillas in a pan. 3. Assemble with shredded cheese.",
    mappedIngredients: [
      { name: "Ground Beef", qty: 500, unit: "g" },
      { name: "Tortillas", qty: 4, unit: "pcs" },
      { name: "Onion", qty: 0.5, unit: "pcs" },
      { name: "Cheddar Cheese", qty: 100, unit: "g" }
    ]
  },
  {
    id: recipeIds.stirfry,
    name: "Chicken & Broccoli Stir Fry",
    tags: "Asian, Healthy, One-Pan",
    ingredients: "Chicken Breast, Broccoli, Soy Sauce, Garlic, Rice",
    instructions: "1. Slice chicken and broccoli. 2. Stir fry chicken until opaque. 3. Add broccoli and soy sauce. 4. Serve over boiled rice.",
    mappedIngredients: [
      { name: "Chicken Breast", qty: 400, unit: "g" },
      { name: "Broccoli", qty: 1, unit: "head" },
      { name: "Soy Sauce", qty: 50, unit: "ml" },
      { name: "White Rice", qty: 200, unit: "g" }
    ]
  },
  {
    id: recipeIds.curry,
    name: "Red Chicken Curry",
    tags: "Spicy, Thai, Hearty",
    ingredients: "Chicken Breast, Coconut Milk, Red Curry Paste, Bell Peppers, Rice",
    instructions: "1. Simmer curry paste with coconut milk. 2. Add sliced chicken and peppers. 3. Cook until tender and serve with rice.",
    mappedIngredients: [
      { name: "Chicken Breast", qty: 500, unit: "g" },
      { name: "Coconut Milk", qty: 400, unit: "ml" },
      { name: "Red Curry Paste", qty: 2, unit: "tbsp" },
      { name: "Bell Peppers", qty: 2, unit: "pcs" }
    ]
  },
  {
    id: recipeIds.pasta,
    name: "Simple Spaghetti Aglio e Olio",
    tags: "Vegetarian, Italian, Pantry Staples",
    ingredients: "Spaghetti, Garlic, Olive Oil, Red Pepper Flakes",
    instructions: "1. Boil spaghetti. 2. Sauté a lot of garlic in olive oil. 3. Toss pasta in the oil with a splash of pasta water.",
    mappedIngredients: [
      { name: "Spaghetti", qty: 250, unit: "g" },
      { name: "Garlic", qty: 4, unit: "cloves" },
      { name: "Olive Oil", qty: 60, unit: "ml" }
    ]
  },
  {
    id: recipeIds.steak,
    name: "Classic Steak and Peppers",
    tags: "High Protein, Dinner",
    ingredients: "Beef Steak, Bell Peppers, Onion, Butter",
    instructions: "1. Sear steak in a hot pan. 2. Remove and sauté sliced peppers and onions. 3. Slice steak and serve together.",
    mappedIngredients: [
      { name: "Beef Steak", qty: 400, unit: "g" },
      { name: "Bell Peppers", qty: 2, unit: "pcs" },
      { name: "Onion", qty: 1, unit: "pcs" },
      { name: "Butter", qty: 30, unit: "g" }
    ]
  },
  // NEW RECIPES (all mappedIngredients preserved exactly)
  {
    id: recipeIds.pizza,
    name: "Margherita Pizza",
    tags: "Italian, Vegetarian, Comfort",
    ingredients: "Tomato Sauce, Mozzarella Cheese, Flour, Olive Oil",
    instructions: "1. Mix flour, water, yeast for dough. 2. Spread tomato sauce and mozzarella. 3. Bake at 450°F for 12-15 mins.",
    mappedIngredients: [
      { name: "Tomato Sauce", qty: 200, unit: "g" },
      { name: "Mozzarella Cheese", qty: 200, unit: "g" },
      { name: "Flour", qty: 300, unit: "g" },
      { name: "Olive Oil", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: recipeIds.pancakes,
    name: "Fluffy Pancakes",
    tags: "Breakfast, Quick, Family",
    ingredients: "Flour, Eggs, Milk, Baking Powder, Sugar",
    instructions: "1. Mix dry ingredients. 2. Add wet ingredients and whisk. 3. Cook on medium heat until golden both sides.",
    mappedIngredients: [
      { name: "Flour", qty: 200, unit: "g" },
      { name: "Eggs", qty: 2, unit: "pcs" },
      { name: "Milk", qty: 250, unit: "ml" },
      { name: "Baking Powder", qty: 2, unit: "tsp" },
      { name: "Sugar", qty: 2, unit: "tbsp" }
    ]
  },
  {
    id: recipeIds.chili,
    name: "Beef Chili",
    tags: "Hearty, Spicy, Freezer Friendly",
    ingredients: "Ground Beef, Tomatoes, Onion, Bell Peppers",
    instructions: "1. Brown beef with onions. 2. Add chopped tomatoes and peppers. 3. Simmer 30 mins with chili powder.",
    mappedIngredients: [
      { name: "Ground Beef", qty: 500, unit: "g" },
      { name: "Tomatoes", qty: 4, unit: "pcs" },
      { name: "Onion", qty: 1, unit: "pcs" },
      { name: "Bell Peppers", qty: 2, unit: "pcs" }
    ]
  },
  {
    id: recipeIds.sushi,
    name: "California Roll",
    tags: "Japanese, Healthy, Fun",
    ingredients: "White Rice, Nori Sheets, Avocado, Shrimp",
    instructions: "1. Cook sushi rice. 2. Lay nori, rice, fillings. 3. Roll tightly and slice.",
    mappedIngredients: [
      { name: "White Rice", qty: 200, unit: "g" },
      { name: "Nori Sheets", qty: 2, unit: "sheets" },
      { name: "Avocado", qty: 1, unit: "pcs" },
      { name: "Shrimp", qty: 100, unit: "g" }
    ]
  },
  {
    id: recipeIds.lasagna,
    name: "Classic Lasagna",
    tags: "Italian, Family Dinner, Make Ahead",
    ingredients: "Ground Beef, Lasagna Noodles, Tomato Sauce, Cheddar Cheese",
    instructions: "1. Layer noodles, beef sauce, cheese. 2. Bake covered 45 mins at 375°F. 3. Uncover last 15 mins.",
    mappedIngredients: [
      { name: "Ground Beef", qty: 600, unit: "g" },
      { name: "Lasagna Noodles", qty: 12, unit: "pcs" },
      { name: "Tomato Sauce", qty: 500, unit: "g" },
      { name: "Cheddar Cheese", qty: 300, unit: "g" }
    ]
  },
  {
    id: recipeIds.stirfryVeg,
    name: "Veggie Stir Fry",
    tags: "Vegan, Quick, Healthy",
    ingredients: "Broccoli, Bell Peppers, Soy Sauce, Zucchini",
    instructions: "1. Chop veggies evenly. 2. High heat stir fry 5-7 mins. 3. Add soy sauce last minute.",
    mappedIngredients: [
      { name: "Broccoli", qty: 1, unit: "head" },
      { name: "Bell Peppers", qty: 2, unit: "pcs" },
      { name: "Soy Sauce", qty: 30, unit: "ml" },
      { name: "Zucchini", qty: 2, unit: "pcs" }
    ]
  },
  {
    id: recipeIds.quesadilla,
    name: "Chicken Quesadilla",
    tags: "Mexican, Quick, Kid Friendly",
    ingredients: "Chicken Breast, Cheddar Cheese, Tortillas, Onion",
    instructions: "1. Shred cooked chicken. 2. Fill tortilla with chicken, cheese, onions. 3. Pan fry until crispy.",
    mappedIngredients: [
      { name: "Chicken Breast", qty: 200, unit: "g" },
      { name: "Cheddar Cheese", qty: 100, unit: "g" },
      { name: "Tortillas", qty: 2, unit: "pcs" },
      { name: "Onion", qty: 0.25, unit: "pcs" }
    ]
  },
  {
    id: recipeIds.friedRice,
    name: "Chicken Fried Rice",
    tags: "Asian, One Pan, Leftovers",
    ingredients: "White Rice, Eggs, Chicken Breast, Soy Sauce",
    instructions: "1. Scramble eggs, set aside. 2. Stir fry chicken and cold rice. 3. Add soy and eggs.",
    mappedIngredients: [
      { name: "White Rice", qty: 300, unit: "g" },
      { name: "Eggs", qty: 2, unit: "pcs" },
      { name: "Chicken Breast", qty: 200, unit: "g" },
      { name: "Soy Sauce", qty: 40, unit: "ml" }
    ]
  },
  {
    id: recipeIds.omelette,
    name: "Veggie Omelette",
    tags: "Breakfast, Quick, High Protein",
    ingredients: "Eggs, Spinach, Onion, Cheddar Cheese",
    instructions: "1. Whisk eggs. 2. Sauté veggies. 3. Pour eggs over, fold when set.",
    mappedIngredients: [
      { name: "Eggs", qty: 3, unit: "pcs" },
      { name: "Spinach", qty: 50, unit: "g" },
      { name: "Onion", qty: 0.25, unit: "pcs" },
      { name: "Cheddar Cheese", qty: 50, unit: "g" }
    ]
  },
  {
    id: recipeIds.padthai,
    name: "Chicken Pad Thai",
    tags: "Thai, Spicy, Noodles",
    ingredients: "Chicken Breast, Spaghetti, Peanut Butter, Lime",
    instructions: "1. Stir fry chicken and noodles. 2. Add peanut sauce and lime. 3. Garnish with peanuts.",
    mappedIngredients: [
      { name: "Chicken Breast", qty: 300, unit: "g" },
      { name: "Spaghetti", qty: 200, unit: "g" },
      { name: "Peanut Butter", qty: 3, unit: "tbsp" },
      { name: "Lime", qty: 1, unit: "pcs" }
    ]
  },
  {
    id: recipeIds.burgers,
    name: "Classic Beef Burgers",
    tags: "American, BBQ, Family",
    ingredients: "Ground Beef, Bun, Onion, Cheddar Cheese",
    instructions: "1. Form beef patties. 2. Grill 4-5 mins per side. 3. Serve on buns with toppings.",
    mappedIngredients: [
      { name: "Ground Beef", qty: 400, unit: "g" },
      { name: "Bun", qty: 4, unit: "pcs" },
      { name: "Onion", qty: 0.5, unit: "pcs" },
      { name: "Cheddar Cheese", qty: 100, unit: "g" }
    ]
  },
  {
    id: recipeIds.soup,
    name: "Tomato Soup",
    tags: "Comfort, Quick, Vegetarian",
    ingredients: "Tomatoes, Onion, Garlic, Milk",
    instructions: "1. Sauté onion and garlic. 2. Add tomatoes and simmer 20 mins. 3. Blend smooth, add milk.",
    mappedIngredients: [
      { name: "Tomatoes", qty: 6, unit: "pcs" },
      { name: "Onion", qty: 1, unit: "pcs" },
      { name: "Garlic", qty: 2, unit: "cloves" },
      { name: "Milk", qty: 200, unit: "ml" }
    ]
  },
  {
    id: recipeIds.cookies,
    name: "Chocolate Chip Cookies",
    tags: "Dessert, Baking, Kid Friendly",
    ingredients: "Flour, Butter, Sugar, Eggs",
    instructions: "1. Cream butter and sugar. 2. Add eggs and flour. 3. Bake 10-12 mins at 375°F.",
    mappedIngredients: [
      { name: "Flour", qty: 250, unit: "g" },
      { name: "Butter", qty: 200, unit: "g" },
      { name: "Sugar", qty: 200, unit: "g" },
      { name: "Eggs", qty: 2, unit: "pcs" }
    ]
  }
];

// FIXED: Generate recipe_ingredients table data to match NEW SCHEMA
export const seedRecipeIngredients = seedRecipes.flatMap(recipe =>
  recipe.mappedIngredients.map(ing => ({
    recipe_id: recipe.id,
    ingredient_id: ingredientToPantryId[ing.name] || null,  // Links to pantry ID
    quantity_needed: ing.qty,
    unit: ing.unit
  }))
);
