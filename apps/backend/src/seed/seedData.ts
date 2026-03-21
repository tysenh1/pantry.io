import { v4 as uuidv4 } from 'uuid';

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
  fish: uuidv4(),
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
  cheese: uuidv4(),
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
  rice: uuidv4(),
  flour: uuidv4(),
  pasta: uuidv4(),
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
  chocolate: uuidv4()
};

export const seedGenericNames = [
  // Proteins
  { id: genericNameIds.chicken, name: 'Chicken' },
  { id: genericNameIds.beef, name: 'Beef' },
  { id: genericNameIds.pork, name: 'Pork' },
  { id: genericNameIds.fish, name: 'Fish' },
  { id: genericNameIds.shrimp, name: 'Shrimp' },
  { id: genericNameIds.eggs, name: 'Eggs' },
  { id: genericNameIds.tofu, name: 'Tofu' },
  { id: genericNameIds.turkey, name: 'Turkey' },
  { id: genericNameIds.lamb, name: 'Lamb' },
  { id: genericNameIds.sausage, name: 'Sausage' },
  { id: genericNameIds.bacon, name: 'Bacon' },

  // Dairy
  { id: genericNameIds.milk, name: 'Milk' },
  { id: genericNameIds.butter, name: 'Butter' },
  { id: genericNameIds.cheese, name: 'Cheese' },
  { id: genericNameIds.yogurt, name: 'Yogurt' },
  { id: genericNameIds.cream, name: 'Cream' },
  { id: genericNameIds.sour_cream, name: 'Sour Cream' },
  { id: genericNameIds.cream_cheese, name: 'Cream Cheese' },
  { id: genericNameIds.parmesan, name: 'Parmesan' },

  // Produce
  { id: genericNameIds.onion, name: 'Onion' },
  { id: genericNameIds.garlic, name: 'Garlic' },
  { id: genericNameIds.potato, name: 'Potato' },
  { id: genericNameIds.tomato, name: 'Tomato' },
  { id: genericNameIds.carrot, name: 'Carrot' },
  { id: genericNameIds.bell_pepper, name: 'Bell Pepper' },
  { id: genericNameIds.broccoli, name: 'Broccoli' },
  { id: genericNameIds.spinach, name: 'Spinach' },
  { id: genericNameIds.lettuce, name: 'Lettuce' },
  { id: genericNameIds.cucumber, name: 'Cucumber' },
  { id: genericNameIds.zucchini, name: 'Zucchini' },
  { id: genericNameIds.mushroom, name: 'Mushroom' },
  { id: genericNameIds.cabbage, name: 'Cabbage' },
  { id: genericNameIds.ginger, name: 'Ginger' },
  { id: genericNameIds.avocado, name: 'Avocado' },
  { id: genericNameIds.apple, name: 'Apple' },
  { id: genericNameIds.banana, name: 'Banana' },
  { id: genericNameIds.lemon, name: 'Lemon' },
  { id: genericNameIds.lime, name: 'Lime' },

  // Pantry
  { id: genericNameIds.rice, name: 'Rice' },
  { id: genericNameIds.flour, name: 'Flour' },
  { id: genericNameIds.pasta, name: 'Pasta' },
  { id: genericNameIds.bread, name: "Bread" },
  { id: genericNameIds.oats, name: 'Oats' },
  { id: genericNameIds.quinoa, name: 'Quinoa' },
  { id: genericNameIds.tortilla, name: 'Tortilla' },
  { id: genericNameIds.breadcrumbs, name: 'Breadcrumbs' },


  { id: genericNameIds.olive_oil, name: 'Olive Oil' },
  { id: genericNameIds.vegetable_oil, name: "Vegetable Oil" },
  { id: genericNameIds.soy_sauce, name: "Soy Sauce" },
  { id: genericNameIds.vinegar, name: "Vinegar" },
  { id: genericNameIds.ketchup, name: 'Ketchup' },
  { id: genericNameIds.mustard, name: 'Mustard' },
  { id: genericNameIds.mayonnaise, name: "Mayonnaise" },
  { id: genericNameIds.hot_sauce, name: "Hot Sauce" },
  { id: genericNameIds.honey, name: "Honey" },
  { id: genericNameIds.maple_syrup, name: "Maple Syrup" },


  { id: genericNameIds.salt, name: 'Salt' },
  { id: genericNameIds.black_pepper, name: "Black Pepper" },
  { id: genericNameIds.sugar, name: 'Sugar' },
  { id: genericNameIds.brown_sugar, name: "Brown Sugar" },
  { id: genericNameIds.baking_powder, name: "Baking Powder" },
  { id: genericNameIds.baking_soda, name: "Baking Soda" },
  { id: genericNameIds.yeast, name: "Yeast" },
  { id: genericNameIds.vanilla, name: "Vanilla" },
  { id: genericNameIds.cinnamon, name: "Cinnamon" },
  { id: genericNameIds.cumin, name: "Cumin" },
  { id: genericNameIds.paprika, name: "Paprika" },
  { id: genericNameIds.chili_powder, name: "Chili Powder" },
  { id: genericNameIds.oregano, name: "Oregano" },


  { id: genericNameIds.chickpeas, name: 'Chickpeas' },
  { id: genericNameIds.black_beans, name: "Black Beans" },
  { id: genericNameIds.lentils, name: "Lentils" },
  { id: genericNameIds.coconut_milk, name: 'Coconut Milk' },
  { id: genericNameIds.tomato_sauce, name: "Tomato Sauce" },
  { id: genericNameIds.broth, name: "Broth" },
  { id: genericNameIds.peanut_butter, name: "Peanut Butter" },
  { id: genericNameIds.corn, name: "Corn" },
  { id: genericNameIds.peas, name: "Peas" },
  { id: genericNameIds.artichoke, name: "Artichoke" },
  { id: genericNameIds.chocolate, name: "Chocolate" }
];

// Track ingredient-to-pantry-ID mapping for recipe_ingredients table
const ingredientToPantryId: Record<string, string> = {};

interface Pantry {
  id: string;
  item_name: string;
  quantity: number;
  unit: string;
  is_staple: number;
  generic_name_id: string;
}

export const seedPantry: Pantry[] = [
  // ALL pantry items with FIXED IDs that match recipe mappedIngredients
  { id: ingredientIds.chickenBreast, item_name: 'Chicken Breast', quantity: 1000, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.chicken },
  { id: ingredientIds.groundBeef, item_name: 'Ground Beef', quantity: 500, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.beef },
  { id: ingredientIds.eggs, item_name: 'Eggs', quantity: 12, unit: 'pcs', is_staple: 1, generic_name_id: genericNameIds.eggs },
  { id: ingredientIds.salmonFillet, item_name: 'Salmon Fillet', quantity: 300, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.fish },
  { id: ingredientIds.shrimp, item_name: 'Shrimp', quantity: 200, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.fish },
  { id: ingredientIds.spaghetti, item_name: 'Spaghetti', quantity: 500, unit: 'g', is_staple: 1, generic_name_id: genericNameIds.pasta },
  { id: ingredientIds.whiteRice, item_name: 'White Rice', quantity: 2, unit: 'kg', is_staple: 1, generic_name_id: genericNameIds.rice },
  { id: ingredientIds.tortilla, item_name: 'Tortillas', quantity: 8, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.tortilla },
  { id: ingredientIds.brownRice, item_name: 'Brown Rice', quantity: 1, unit: 'kg', is_staple: 1, generic_name_id: genericNameIds.rice },
  { id: ingredientIds.breadSlice, item_name: 'Bread Slices', quantity: 20, unit: 'pcs', is_staple: 1, generic_name_id: genericNameIds.bread },
  { id: ingredientIds.lasangaNoodle, item_name: 'Lasagna Noodles', quantity: 400, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.pasta },
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
  { id: ingredientIds.cheddarCheese, item_name: 'Cheddar Cheese', quantity: 200, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.cheese },
  { id: ingredientIds.milk, item_name: 'Milk', quantity: 2, unit: 'L', is_staple: 1, generic_name_id: genericNameIds.milk },
  { id: ingredientIds.flour, item_name: 'Flour', quantity: 2, unit: 'kg', is_staple: 1, generic_name_id: genericNameIds.flour },
  { id: ingredientIds.sugar, item_name: 'Sugar', quantity: 1, unit: 'kg', is_staple: 1, generic_name_id: genericNameIds.sugar },
  { id: ingredientIds.honey, item_name: 'Honey', quantity: 500, unit: 'g', is_staple: 1, generic_name_id: genericNameIds.honey },
  { id: ingredientIds.tomatoSauce, item_name: 'Tomato Sauce', quantity: 800, unit: 'g', is_staple: 1, generic_name_id: genericNameIds.tomato_sauce },
  // MISSING INGREDIENTS NOW PROPERLY ADDED
  { id: ingredientIds.coconutMilk, item_name: 'Coconut Milk', quantity: 0, unit: 'ml', is_staple: 0, generic_name_id: genericNameIds.coconut_milk },
  { id: ingredientIds.redCurryPaste, item_name: 'Red Curry Paste', quantity: 0, unit: 'tbsp', is_staple: 0, generic_name_id: genericNameIds.tomato_sauce },
  { id: ingredientIds.beefSteak, item_name: 'Beef Steak', quantity: 0, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.beef },
  { id: ingredientIds.mozzarellaCheese, item_name: 'Mozzarella Cheese', quantity: 0, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.cheese },
  { id: ingredientIds.bakingPowder, item_name: 'Baking Powder', quantity: 0, unit: 'tsp', is_staple: 0, generic_name_id: genericNameIds.baking_powder },
  { id: ingredientIds.noriSheets, item_name: 'Nori Sheets', quantity: 0, unit: 'sheets', is_staple: 0, generic_name_id: genericNameIds.tortilla },
  { id: ingredientIds.avocado, item_name: 'Avocado', quantity: 0, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.avocado },
  { id: ingredientIds.peanutButter, item_name: 'Peanut Butter', quantity: 0, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.peanut_butter },
  { id: ingredientIds.lime, item_name: 'Lime', quantity: 0, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.lime },
  { id: ingredientIds.bun, item_name: 'Bun', quantity: 0, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.bread },
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
