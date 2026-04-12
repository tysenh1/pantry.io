export interface ItemInfo {
  barcode: string;
  productName: string;
  genericName: GenericNameInfo;
  unitSize: number;
  unitType: string;
}

export interface GenericNameInfo {
  id: string;
  name: string;
}

export interface PantryGenericNameResponse {
  pantryId: string;
  genericNameId: string;
  weightPerPiece: number;
  name: string;
  primaryUnit: string;
}

export interface BarcodeLookupResponse {
  doesItemExist: boolean;
  item: Omit<ItemInfo, 'genericName'>;
  genericNames: GenericNameInfo[]
}

export interface Recipe {
  name: string;
  instructions: string;
  tags: string;
  ingredients: RecipeIngredients[];
}

export interface RecipeIngredients {
  recipe_id: string;
  pantry_id: string;
  quantity_needed: number;
  unit: string;
}

