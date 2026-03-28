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
  // --- PROTEINS ---
  chicken: uuidv4(), beef: uuidv4(), pork: uuidv4(), steak: uuidv4(),
  lamb: uuidv4(), turkey: uuidv4(), duck: uuidv4(), venison: uuidv4(),
  bacon: uuidv4(), sausage: uuidv4(), ham: uuidv4(), deliMeat: uuidv4(),
  salmon: uuidv4(), whiteFish: uuidv4(), tuna: uuidv4(), shrimp: uuidv4(),
  scallops: uuidv4(), mussels: uuidv4(), crab: uuidv4(), lobster: uuidv4(),
  eggs: uuidv4(), tofu: uuidv4(), tempeh: uuidv4(), seitan: uuidv4(),

  // --- DAIRY & ALTERNATIVES ---
  milk: uuidv4(), heavyCream: uuidv4(), sourCream: uuidv4(), yogurt: uuidv4(),
  butter: uuidv4(), ghee: uuidv4(), margarine: uuidv4(), creamCheese: uuidv4(),
  cheddarCheese: uuidv4(), mozzarellaCheese: uuidv4(), parmesanCheese: uuidv4(),
  fetaCheese: uuidv4(), goatCheese: uuidv4(), ricottaCheese: uuidv4(),
  swissCheese: uuidv4(), cottageCheese: uuidv4(), almondMilk: uuidv4(),
  soyMilk: uuidv4(), oatMilk: uuidv4(), coconutMilk: uuidv4(),

  // --- VEGETABLES ---
  onion: uuidv4(), garlic: uuidv4(), shallot: uuidv4(), scallion: uuidv4(),
  potato: uuidv4(), sweetPotato: uuidv4(), carrot: uuidv4(), celery: uuidv4(),
  broccoli: uuidv4(), cauliflower: uuidv4(), cabbage: uuidv4(), bokChoy: uuidv4(),
  spinach: uuidv4(), kale: uuidv4(), lettuce: uuidv4(), arugula: uuidv4(),
  bellPepper: uuidv4(), chiliPepper: uuidv4(), jalapeno: uuidv4(),
  tomato: uuidv4(), cherryTomato: uuidv4(), cucumber: uuidv4(), zucchini: uuidv4(),
  eggplant: uuidv4(), asparagus: uuidv4(), greenBeans: uuidv4(), peas: uuidv4(),
  corn: uuidv4(), mushroom: uuidv4(), radish: uuidv4(), beet: uuidv4(),
  turnip: uuidv4(), parsnip: uuidv4(), fennel: uuidv4(), artichoke: uuidv4(),
  brusselsSprout: uuidv4(), leek: uuidv4(), ginger: uuidv4(),

  // --- FRUIT ---
  apple: uuidv4(), banana: uuidv4(), orange: uuidv4(), lemon: uuidv4(),
  lime: uuidv4(), grapefruit: uuidv4(), strawberry: uuidv4(), blueberry: uuidv4(),
  raspberry: uuidv4(), blackberry: uuidv4(), grape: uuidv4(), watermelon: uuidv4(),
  cantaloupe: uuidv4(), pineapple: uuidv4(), mango: uuidv4(), peach: uuidv4(),
  pear: uuidv4(), plum: uuidv4(), cherry: uuidv4(), kiwi: uuidv4(),
  avocado: uuidv4(), pomegranate: uuidv4(), coconut: uuidv4(),

  // --- GRAINS, PASTA & BREAD ---
  whiteRice: uuidv4(), brownRice: uuidv4(), quinoa: uuidv4(), couscous: uuidv4(),
  barley: uuidv4(), oats: uuidv4(), flour: uuidv4(), cornmeal: uuidv4(),
  spaghettiNoodle: uuidv4(), shortPasta: uuidv4(), lasagnaNoodle: uuidv4(),
  eggNoodle: uuidv4(), riceNoodle: uuidv4(), bread: uuidv4(), bun: uuidv4(),
  bagel: uuidv4(), tortilla: uuidv4(), pita: uuidv4(), breadcrumbs: uuidv4(),

  // --- BAKING & SWEETENERS ---
  sugar: uuidv4(), brownSugar: uuidv4(), powderedSugar: uuidv4(), honey: uuidv4(),
  mapleSyrup: uuidv4(), molasses: uuidv4(), vanilla: uuidv4(), yeast: uuidv4(),
  bakingPowder: uuidv4(), bakingSoda: uuidv4(), cocoaPowder: uuidv4(),
  chocolate: uuidv4(), chocolateChips: uuidv4(), cornstarch: uuidv4(),

  // --- OILS & VINEGARS ---
  oliveOil: uuidv4(), vegetableOil: uuidv4(), coconutOil: uuidv4(),
  sesameOil: uuidv4(), balsamicVinegar: uuidv4(), appleCiderVinegar: uuidv4(),
  whiteVinegar: uuidv4(), riceVinegar: uuidv4(), redWineVinegar: uuidv4(),

  // --- CONDIMENTS & SAUCES ---
  ketchup: uuidv4(), mustard: uuidv4(), mayonnaise: uuidv4(), soySauce: uuidv4(),
  fishSauce: uuidv4(), oysterSauce: uuidv4(), hotSauce: uuidv4(), sriracha: uuidv4(),
  bbqSauce: uuidv4(), worcestershireSauce: uuidv4(), tahini: uuidv4(),
  miso: uuidv4(), pesto: uuidv4(), tomatoSauce: uuidv4(), salsa: uuidv4(),
  peanutButter: uuidv4(), almondButter: uuidv4(), jam: uuidv4(),

  // --- CANNED & DRY LEGUMES ---
  chickpeas: uuidv4(), blackBeans: uuidv4(), kidneyBeans: uuidv4(),
  pintoBeans: uuidv4(), lentils: uuidv4(), broth: uuidv4(),

  // --- SPICES & HERBS ---
  salt: uuidv4(), blackPepper: uuidv4(), cumin: uuidv4(), paprika: uuidv4(),
  smokedPaprika: uuidv4(), cinnamon: uuidv4(), chiliPowder: uuidv4(),
  turmeric: uuidv4(), coriander: uuidv4(), cardamom: uuidv4(), nutmeg: uuidv4(),
  oregano: uuidv4(), basil: uuidv4(), thyme: uuidv4(), rosemary: uuidv4(),
  parsley: uuidv4(), cilantro: uuidv4(), dill: uuidv4(), bayLeaf: uuidv4()
};

export const seedGenericNames = [
  // --- PROTEINS ---
  { id: genericNameIds.chicken, name: 'Chicken', primary_unit: 'g', weight_per_piece: 200 },
  { id: genericNameIds.beef, name: 'Beef', primary_unit: 'g', weight_per_piece: 500 },
  { id: genericNameIds.pork, name: 'Pork', primary_unit: 'g', weight_per_piece: 200 },
  { id: genericNameIds.steak, name: 'Steak', primary_unit: 'g', weight_per_piece: 250 },
  { id: genericNameIds.lamb, name: 'Lamb', primary_unit: 'g', weight_per_piece: 250 },
  { id: genericNameIds.turkey, name: 'Turkey', primary_unit: 'g', weight_per_piece: 5000 },
  { id: genericNameIds.duck, name: 'Duck', primary_unit: 'g', weight_per_piece: 2000 },
  { id: genericNameIds.venison, name: 'Venison', primary_unit: 'g', weight_per_piece: 250 },
  { id: genericNameIds.bacon, name: 'Bacon', primary_unit: 'pcs', weight_per_piece: 25 },
  { id: genericNameIds.sausage, name: 'Sausage', primary_unit: 'pcs', weight_per_piece: 75 },
  { id: genericNameIds.ham, name: 'Ham', primary_unit: 'g', weight_per_piece: 500 },
  { id: genericNameIds.deliMeat, name: 'Deli Meat', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.salmon, name: 'Salmon', primary_unit: 'g', weight_per_piece: 150 },
  { id: genericNameIds.whiteFish, name: 'White Fish', primary_unit: 'g', weight_per_piece: 150 },
  { id: genericNameIds.tuna, name: 'Tuna', primary_unit: 'g', weight_per_piece: 170 },
  { id: genericNameIds.shrimp, name: 'Shrimp', primary_unit: 'g', weight_per_piece: 15 },
  { id: genericNameIds.scallops, name: 'Scallops', primary_unit: 'g', weight_per_piece: 30 },
  { id: genericNameIds.mussels, name: 'Mussels', primary_unit: 'g', weight_per_piece: 20 },
  { id: genericNameIds.crab, name: 'Crab', primary_unit: 'g', weight_per_piece: 100 },
  { id: genericNameIds.lobster, name: 'Lobster', primary_unit: 'g', weight_per_piece: 500 },
  { id: genericNameIds.eggs, name: 'Egg', primary_unit: 'pcs', weight_per_piece: 50 },
  { id: genericNameIds.tofu, name: 'Tofu', primary_unit: 'g', weight_per_piece: 400 },
  { id: genericNameIds.tempeh, name: 'Tempeh', primary_unit: 'g', weight_per_piece: 225 },
  { id: genericNameIds.seitan, name: 'Seitan', primary_unit: 'g', weight_per_piece: 225 },

  // --- DAIRY & ALTERNATIVES ---
  { id: genericNameIds.milk, name: 'Milk', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.heavyCream, name: 'Heavy Cream', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.sourCream, name: 'Sour Cream', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.yogurt, name: 'Yogurt', primary_unit: 'g', weight_per_piece: 170 },
  { id: genericNameIds.butter, name: 'Butter', primary_unit: 'g', weight_per_piece: 227 },
  { id: genericNameIds.ghee, name: 'Ghee', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.margarine, name: 'Margarine', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.creamCheese, name: 'Cream Cheese', primary_unit: 'g', weight_per_piece: 226 },
  { id: genericNameIds.cheddarCheese, name: 'Cheddar Cheese', primary_unit: 'g', weight_per_piece: 28 },
  { id: genericNameIds.mozzarellaCheese, name: 'Mozzarella Cheese', primary_unit: 'g', weight_per_piece: 28 },
  { id: genericNameIds.parmesanCheese, name: 'Parmesan Cheese', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.fetaCheese, name: 'Feta Cheese', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.goatCheese, name: 'Goat Cheese', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.ricottaCheese, name: 'Ricotta Cheese', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.swissCheese, name: 'Swiss Cheese', primary_unit: 'g', weight_per_piece: 28 },
  { id: genericNameIds.cottageCheese, name: 'Cottage Cheese', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.almondMilk, name: 'Almond Milk', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.soyMilk, name: 'Soy Milk', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.oatMilk, name: 'Oat Milk', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.coconutMilk, name: 'Coconut Milk', primary_unit: 'ml', weight_per_piece: 400 },

  // --- VEGETABLES ---
  { id: genericNameIds.onion, name: 'Onion', primary_unit: 'pcs', weight_per_piece: 150 },
  { id: genericNameIds.garlic, name: 'Garlic', primary_unit: 'pcs', weight_per_piece: 50 },
  { id: genericNameIds.shallot, name: 'Shallot', primary_unit: 'pcs', weight_per_piece: 25 },
  { id: genericNameIds.scallion, name: 'Scallion', primary_unit: 'pcs', weight_per_piece: 15 },
  { id: genericNameIds.potato, name: 'Potato', primary_unit: 'pcs', weight_per_piece: 200 },
  { id: genericNameIds.sweetPotato, name: 'Sweet Potato', primary_unit: 'pcs', weight_per_piece: 300 },
  { id: genericNameIds.carrot, name: 'Carrot', primary_unit: 'pcs', weight_per_piece: 60 },
  { id: genericNameIds.celery, name: 'Celery', primary_unit: 'pcs', weight_per_piece: 450 },
  { id: genericNameIds.broccoli, name: 'Broccoli', primary_unit: 'g', weight_per_piece: 300 },
  { id: genericNameIds.cauliflower, name: 'Cauliflower', primary_unit: 'pcs', weight_per_piece: 600 },
  { id: genericNameIds.cabbage, name: 'Cabbage', primary_unit: 'pcs', weight_per_piece: 900 },
  { id: genericNameIds.bokChoy, name: 'Bok Choy', primary_unit: 'pcs', weight_per_piece: 200 },
  { id: genericNameIds.spinach, name: 'Spinach', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.kale, name: 'Kale', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.lettuce, name: 'Lettuce', primary_unit: 'pcs', weight_per_piece: 400 },
  { id: genericNameIds.arugula, name: 'Arugula', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.bellPepper, name: 'Bell Pepper', primary_unit: 'pcs', weight_per_piece: 150 },
  { id: genericNameIds.chiliPepper, name: 'Chili Pepper', primary_unit: 'pcs', weight_per_piece: 15 },
  { id: genericNameIds.jalapeno, name: 'Jalapeno', primary_unit: 'pcs', weight_per_piece: 15 },
  { id: genericNameIds.tomato, name: 'Tomato', primary_unit: 'pcs', weight_per_piece: 120 },
  { id: genericNameIds.cherryTomato, name: 'Cherry Tomato', primary_unit: 'g', weight_per_piece: 15 },
  { id: genericNameIds.cucumber, name: 'Cucumber', primary_unit: 'pcs', weight_per_piece: 250 },
  { id: genericNameIds.zucchini, name: 'Zucchini', primary_unit: 'pcs', weight_per_piece: 200 },
  { id: genericNameIds.eggplant, name: 'Eggplant', primary_unit: 'pcs', weight_per_piece: 450 },
  { id: genericNameIds.asparagus, name: 'Asparagus', primary_unit: 'g', weight_per_piece: 20 },
  { id: genericNameIds.greenBeans, name: 'Green Beans', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.peas, name: 'Peas', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.corn, name: 'Corn', primary_unit: 'pcs', weight_per_piece: 200 },
  { id: genericNameIds.mushroom, name: 'Mushroom', primary_unit: 'g', weight_per_piece: 15 },
  { id: genericNameIds.radish, name: 'Radish', primary_unit: 'pcs', weight_per_piece: 20 },
  { id: genericNameIds.beet, name: 'Beet', primary_unit: 'pcs', weight_per_piece: 150 },
  { id: genericNameIds.turnip, name: 'Turnip', primary_unit: 'pcs', weight_per_piece: 200 },
  { id: genericNameIds.parsnip, name: 'Parsnip', primary_unit: 'pcs', weight_per_piece: 120 },
  { id: genericNameIds.fennel, name: 'Fennel', primary_unit: 'pcs', weight_per_piece: 250 },
  { id: genericNameIds.artichoke, name: 'Artichoke', primary_unit: 'pcs', weight_per_piece: 300 },
  { id: genericNameIds.brusselsSprout, name: 'Brussels Sprout', primary_unit: 'g', weight_per_piece: 20 },
  { id: genericNameIds.leek, name: 'Leek', primary_unit: 'pcs', weight_per_piece: 200 },
  { id: genericNameIds.ginger, name: 'Ginger', primary_unit: 'g', weight_per_piece: 1 },

  // --- FRUIT ---
  { id: genericNameIds.apple, name: 'Apple', primary_unit: 'pcs', weight_per_piece: 150 },
  { id: genericNameIds.banana, name: 'Banana', primary_unit: 'pcs', weight_per_piece: 120 },
  { id: genericNameIds.orange, name: 'Orange', primary_unit: 'pcs', weight_per_piece: 130 },
  { id: genericNameIds.lemon, name: 'Lemon', primary_unit: 'pcs', weight_per_piece: 60 },
  { id: genericNameIds.lime, name: 'Lime', primary_unit: 'pcs', weight_per_piece: 40 },
  { id: genericNameIds.grapefruit, name: 'Grapefruit', primary_unit: 'pcs', weight_per_piece: 300 },
  { id: genericNameIds.strawberry, name: 'Strawberry', primary_unit: 'g', weight_per_piece: 12 },
  { id: genericNameIds.blueberry, name: 'Blueberry', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.raspberry, name: 'Raspberry', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.blackberry, name: 'Blackberry', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.grape, name: 'Grape', primary_unit: 'g', weight_per_piece: 5 },
  { id: genericNameIds.watermelon, name: 'Watermelon', primary_unit: 'pcs', weight_per_piece: 5000 },
  { id: genericNameIds.cantaloupe, name: 'Cantaloupe', primary_unit: 'pcs', weight_per_piece: 1500 },
  { id: genericNameIds.pineapple, name: 'Pineapple', primary_unit: 'pcs', weight_per_piece: 900 },
  { id: genericNameIds.mango, name: 'Mango', primary_unit: 'pcs', weight_per_piece: 200 },
  { id: genericNameIds.peach, name: 'Peach', primary_unit: 'pcs', weight_per_piece: 150 },
  { id: genericNameIds.pear, name: 'Pear', primary_unit: 'pcs', weight_per_piece: 180 },
  { id: genericNameIds.plum, name: 'Plum', primary_unit: 'pcs', weight_per_piece: 65 },
  { id: genericNameIds.cherry, name: 'Cherry', primary_unit: 'g', weight_per_piece: 8 },
  { id: genericNameIds.kiwi, name: 'Kiwi', primary_unit: 'pcs', weight_per_piece: 70 },
  { id: genericNameIds.avocado, name: 'Avocado', primary_unit: 'pcs', weight_per_piece: 200 },
  { id: genericNameIds.pomegranate, name: 'Pomegranate', primary_unit: 'pcs', weight_per_piece: 280 },
  { id: genericNameIds.coconut, name: 'Coconut', primary_unit: 'pcs', weight_per_piece: 400 },

  // --- GRAINS, PASTA & BREAD ---
  { id: genericNameIds.whiteRice, name: 'White Rice', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.brownRice, name: 'Brown Rice', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.quinoa, name: 'Quinoa', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.couscous, name: 'Couscous', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.barley, name: 'Barley', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.oats, name: 'Oats', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.flour, name: 'Flour', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cornmeal, name: 'Cornmeal', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.spaghettiNoodle, name: 'Spaghetti', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.shortPasta, name: 'Short Pasta', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.lasagnaNoodle, name: 'Lasagna Noodle', primary_unit: 'g', weight_per_piece: 20 },
  { id: genericNameIds.eggNoodle, name: 'Egg Noodle', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.riceNoodle, name: 'Rice Noodle', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.bread, name: 'Bread', primary_unit: 'pcs', weight_per_piece: 30 },
  { id: genericNameIds.bun, name: 'Bun', primary_unit: 'pcs', weight_per_piece: 50 },
  { id: genericNameIds.bagel, name: 'Bagel', primary_unit: 'pcs', weight_per_piece: 100 },
  { id: genericNameIds.tortilla, name: 'Tortilla', primary_unit: 'pcs', weight_per_piece: 45 },
  { id: genericNameIds.pita, name: 'Pita', primary_unit: 'pcs', weight_per_piece: 60 },
  { id: genericNameIds.breadcrumbs, name: 'Breadcrumbs', primary_unit: 'g', weight_per_piece: 1 },

  // --- BAKING & SWEETENERS ---
  { id: genericNameIds.sugar, name: 'Sugar', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.brownSugar, name: 'Brown Sugar', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.powderedSugar, name: 'Powdered Sugar', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.honey, name: 'Honey', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.mapleSyrup, name: 'Maple Syrup', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.molasses, name: 'Molasses', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.vanilla, name: 'Vanilla Extract', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.yeast, name: 'Yeast', primary_unit: 'g', weight_per_piece: 7 },
  { id: genericNameIds.bakingPowder, name: 'Baking Powder', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.bakingSoda, name: 'Baking Soda', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cocoaPowder, name: 'Cocoa Powder', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.chocolate, name: 'Chocolate', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.chocolateChips, name: 'Chocolate Chips', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cornstarch, name: 'Cornstarch', primary_unit: 'g', weight_per_piece: 1 },

  // --- OILS & VINEGARS ---
  { id: genericNameIds.oliveOil, name: 'Olive Oil', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.vegetableOil, name: 'Vegetable Oil', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.coconutOil, name: 'Coconut Oil', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.sesameOil, name: 'Sesame Oil', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.balsamicVinegar, name: 'Balsamic Vinegar', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.appleCiderVinegar, name: 'Apple Cider Vinegar', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.whiteVinegar, name: 'White Vinegar', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.riceVinegar, name: 'Rice Vinegar', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.redWineVinegar, name: 'Red Wine Vinegar', primary_unit: 'ml', weight_per_piece: 1 },

  // --- CONDIMENTS & SAUCES ---
  { id: genericNameIds.ketchup, name: 'Ketchup', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.mustard, name: 'Mustard', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.mayonnaise, name: 'Mayonnaise', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.soySauce, name: 'Soy Sauce', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.fishSauce, name: 'Fish Sauce', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.oysterSauce, name: 'Oyster Sauce', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.hotSauce, name: 'Hot Sauce', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.sriracha, name: 'Sriracha', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.bbqSauce, name: 'BBQ Sauce', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.worcestershireSauce, name: 'Worcestershire', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.tahini, name: 'Tahini', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.miso, name: 'Miso', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.pesto, name: 'Pesto', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.tomatoSauce, name: 'Tomato Sauce', primary_unit: 'ml', weight_per_piece: 1 },
  { id: genericNameIds.salsa, name: 'Salsa', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.peanutButter, name: 'Peanut Butter', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.almondButter, name: 'Almond Butter', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.jam, name: 'Jam', primary_unit: 'g', weight_per_piece: 1 },

  // --- CANNED & DRY LEGUMES ---
  { id: genericNameIds.chickpeas, name: 'Chickpeas', primary_unit: 'g', weight_per_piece: 425 },
  { id: genericNameIds.blackBeans, name: 'Black Beans', primary_unit: 'g', weight_per_piece: 425 },
  { id: genericNameIds.kidneyBeans, name: 'Kidney Beans', primary_unit: 'g', weight_per_piece: 425 },
  { id: genericNameIds.pintoBeans, name: 'Pinto Beans', primary_unit: 'g', weight_per_piece: 425 },
  { id: genericNameIds.lentils, name: 'Lentils', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.broth, name: 'Broth', primary_unit: 'ml', weight_per_piece: 1 },

  // --- SPICES & HERBS ---
  { id: genericNameIds.salt, name: 'Salt', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.blackPepper, name: 'Black Pepper', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cumin, name: 'Cumin', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.paprika, name: 'Paprika', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.smokedPaprika, name: 'Smoked Paprika', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cinnamon, name: 'Cinnamon', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.chiliPowder, name: 'Chili Powder', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.turmeric, name: 'Turmeric', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.coriander, name: 'Coriander', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cardamom, name: 'Cardamom', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.nutmeg, name: 'Nutmeg', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.oregano, name: 'Oregano', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.basil, name: 'Basil', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.thyme, name: 'Thyme', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.rosemary, name: 'Rosemary', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.parsley, name: 'Parsley', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.cilantro, name: 'Cilantro', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.dill, name: 'Dill', primary_unit: 'g', weight_per_piece: 1 },
  { id: genericNameIds.bayLeaf, name: 'Bay Leaf', primary_unit: 'pcs', weight_per_piece: 1 }
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
  { id: ingredientIds.bellPepper, item_name: 'Bell Peppers', quantity: 3, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.bellPepper },
  { id: ingredientIds.broccoli, item_name: 'Broccoli', quantity: 1, unit: 'head', is_staple: 0, generic_name_id: genericNameIds.broccoli },
  { id: ingredientIds.spinach, item_name: 'Spinach', quantity: 200, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.spinach },
  { id: ingredientIds.carrot, item_name: 'Carrots', quantity: 5, unit: 'pcs', is_staple: 1, generic_name_id: genericNameIds.carrot },
  { id: ingredientIds.tomato, item_name: 'Tomatoes', quantity: 6, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.tomato },
  { id: ingredientIds.mushroom, item_name: 'Mushrooms', quantity: 200, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.mushroom },
  { id: ingredientIds.zucchini, item_name: 'Zucchini', quantity: 3, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.zucchini },
  { id: ingredientIds.oliveOil, item_name: 'Olive Oil', quantity: 1, unit: 'L', is_staple: 1, generic_name_id: genericNameIds.oliveOil },
  { id: ingredientIds.soySauce, item_name: 'Soy Sauce', quantity: 250, unit: 'ml', is_staple: 1, generic_name_id: genericNameIds.soySauce },
  { id: ingredientIds.butter, item_name: 'Butter', quantity: 250, unit: 'g', is_staple: 1, generic_name_id: genericNameIds.butter },
  { id: ingredientIds.cheddarCheese, item_name: 'Cheddar Cheese', quantity: 200, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.cheddarCheese },
  { id: ingredientIds.milk, item_name: 'Milk', quantity: 2, unit: 'L', is_staple: 1, generic_name_id: genericNameIds.milk },
  { id: ingredientIds.flour, item_name: 'Flour', quantity: 2, unit: 'kg', is_staple: 1, generic_name_id: genericNameIds.flour },
  { id: ingredientIds.sugar, item_name: 'Sugar', quantity: 1, unit: 'kg', is_staple: 1, generic_name_id: genericNameIds.sugar },
  { id: ingredientIds.honey, item_name: 'Honey', quantity: 500, unit: 'g', is_staple: 1, generic_name_id: genericNameIds.honey },
  { id: ingredientIds.tomatoSauce, item_name: 'Tomato Sauce', quantity: 800, unit: 'g', is_staple: 1, generic_name_id: genericNameIds.tomatoSauce },
  // MISSING INGREDIENTS NOW PROPERLY ADDED
  { id: ingredientIds.coconutMilk, item_name: 'Coconut Milk', quantity: 0, unit: 'ml', is_staple: 0, generic_name_id: genericNameIds.coconutMilk },
  { id: ingredientIds.beefSteak, item_name: 'Beef Steak', quantity: 0, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.steak },
  { id: ingredientIds.mozzarellaCheese, item_name: 'Mozzarella Cheese', quantity: 0, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.mozzarellaCheese },
  { id: ingredientIds.bakingPowder, item_name: 'Baking Powder', quantity: 0, unit: 'tsp', is_staple: 0, generic_name_id: genericNameIds.bakingPowder },
  { id: ingredientIds.avocado, item_name: 'Avocado', quantity: 0, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.avocado },
  { id: ingredientIds.peanutButter, item_name: 'Peanut Butter', quantity: 0, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.peanutButter },
  { id: ingredientIds.lime, item_name: 'Lime', quantity: 0, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.lime },
  { id: ingredientIds.bun, item_name: 'Bun', quantity: 0, unit: 'pcs', is_staple: 0, generic_name_id: genericNameIds.bun },
  { id: ingredientIds.chocolate, item_name: "Chocolate Snacks", quantity: 0, unit: 'g', is_staple: 0, generic_name_id: genericNameIds.chocolate }
].map(item => {
  ingredientToPantryId[item.item_name] = item.id;
  return item;
});

export const seedRecipes = [
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
