import { ProductV2 } from "@openfoodfacts/openfoodfacts-nodejs";
import type { Database } from 'better-sqlite3';

// DATABASE TYPES

export interface GenericName {
  id: string;
  name: string;
  primary_unit: string;
  weight_per_piece: number;
}

export interface Pantry {
  id: string;
  generic_name_id: string;
  quantity: number;
  is_staple: number;
}

export interface Recipes {
  id: string;
  name: string;
  instructions: string;
  tags: string;
}

export interface RecipeIngredients {
  id: string;
  ingredient_id: string;
  quantity_needed: number;
  unit: string;
}

export interface Item {
  id: string;
  barcode: string;
  product_name: string;
  generic_name_id: string;
  unit_size: number;
  unit_type: string;
}

export interface Allergens {
  id: string;
  name: string;
}

export interface ItemAllergens {
  item_id: string;
  allergen_id: string;
}

export interface RecipeBase {
  id: string;
  name: string;
  tags: string;
}

export interface RecipeFull extends RecipeBase {
  instructions: string;
  ingredients?: string;
}

export interface KitchenTools {
  // getPantry: () => Promise<string>;
  browseAllRecipes: (args: { db: Database }) => string;
  getRecipeDetails: (args: { recipe_id: string, db: Database }) => string;
  subtractRecipeIngredientQuantities: (args: { recipe_id: string, db: Database }) => string;
}

export interface LLMResponse {
  thought_process: string,
  flag: string,
  message: string,
  recipe_id: string | null,
  reset_context: boolean
}

export interface OFFResponse {
  code: string;
  status: number;
  status_verbose: string;
  product: Product;
}

export interface OFFProductResponse {
  allergens?: string;
  allergens_tags?: string[];
  generic_name?: string;
  generic_name_en?: string;
  image_small_url?: string;
  image_url?: string;
  product_name?: string;
  product_name_en?: string;
  product_quantity?: number;
  quantity?: string;
  product_quantity_string?: string;
  product_quantity_unit: string;
  net_weight_unit?: string;
}

// ADD ANY MISSING TYPES HERE FOR THE OFF PRODUCT TYPE
export interface OffProductExtras {
  net_weight_unit?: string;
  product_quantity_string?: string;
  product_quantity?: number;
}

export type Product = ProductV2 & OffProductExtras

export interface QuantityUpdateInfo {
  quantity: number;
  primary_unit: string;
  weight_per_piece: number;
}

export interface SubtractQuantitiesResult {
  name: string;
  newQuantity: number;
}
