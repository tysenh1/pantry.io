import { type ProductV2 } from "@openfoodfacts/openfoodfacts-nodejs"
import { db } from "../config/db";
import Fuse, { FuseResult } from 'fuse.js'
import { GenericNameInfo, ItemInfo } from "../../../../../shared/types";
import { QuantityUpdateInfo } from "../types";

const UNIT_REGEX = /^([0-9.]+)\s*([a-zA-Z]+)/;

export function parseUnit(product: ProductV2): string {

  if (product.product_quantity_unit) {
    return product.product_quantity_unit
  } else if (product.net_weight_unit) {
    return product.net_weight_unit
  } else if (product.product_quantity_string) {
    const regexArray = product.product_quantity_string.match(UNIT_REGEX)
    if (regexArray[2]) {
      return regexArray[2] ? regexArray[2] as string : ''
    }
  } else if (product.quantity) {
    const regexArray = product.quantity.match(UNIT_REGEX)
    if (regexArray[2]) {
      return regexArray[2] ? regexArray[2] as string : ''
    }
  }

  return ''

}

export function parseQuantity(product: ProductV2): number {
  let finalQuantity = 0;
  if (product.product_quantity) {
    // @ts-expect-error type is actually a number and turning it into a string removes decimal values
    finalQuantity = product.product_quantity as number
  } else if (product.quantity) {
    const regexArray = product.quantity.match(UNIT_REGEX)
    if (regexArray[1]) {
      finalQuantity = parseFloat(regexArray[1])
    }
  }

  return finalQuantity;
}

export const findGenericMatch = (productName: string = '', categoriesString: string = ''): FuseResult<GenericNameInfo>[] => {
  const categories = categoriesString.split(',')
  const genericBuckets = db.prepare('SELECT id, name FROM generic_name').all();

  const fuseOptions = {
    keys: ['name'],
    threshold: 0.4,
    includeScore: true,
    ignoreFieldNorm: true
  }

  const fuse = new Fuse(genericBuckets, fuseOptions)

  const searchResults: FuseResult<GenericNameInfo>[] = []

  if (categories.length > 0) {
    for (const cat of categories) {
      const results: FuseResult<GenericNameInfo>[] = fuse.search(cat)

      for (const result of results) {
        searchResults.push(result)
      }
    }
  }

  const cleanedName = productName
    .replace(/\d+(\.\d+)?\s*(oz|g|ml|kg|lb|oz|pcs)/gi, '') // Strip units
    .trim();
  const splitName = cleanedName.split(' ')

  for (const word of splitName) {
    const results: FuseResult<GenericNameInfo>[] = fuse.search(word)

    for (const result of results) {
      searchResults.push(result)
    }
  }

  return searchResults;
}

export const incrementQuantity = async (item: ItemInfo): Promise<ItemInfo> => {
  const quantityUpdateInfo: QuantityUpdateInfo = await db.prepare(`
SELECT p.quantity, g.primary_unit, g.weight_per_piece FROM generic_name g JOIN pantry p ON p.generic_name_id = g.id WHERE g.id = ?
`).get(item.genericName.id)
  const newQuantity = getNewQuantity(quantityUpdateInfo, item.unitSize, item.unitType)

  await db.prepare(`
  UPDATE pantry SET quantity = ? WHERE generic_name_id = ?
  `).run(newQuantity, item.genericName.id)

  const newQuantityWithOldUnit = normalizeQuantity(newQuantity, item.unitType)

  return {
    barcode: item.barcode,
    productName: item.productName,
    genericName: item.genericName,
    unitSize: newQuantityWithOldUnit,
    unitType: item.unitType
  }
}

export const getNewQuantity = (info: QuantityUpdateInfo, unitSize: number, unitType: string) => {

  if (info.primary_unit == unitType) {
    return info.quantity + unitSize
  }

  if (unitType === 'pcs' && info.primary_unit !== 'pcs') {
    const amountGrams = unitSize * info.weight_per_piece
    // This is mostly here as a safeguard in case I add more units that the pantry can have, right now its just ml, g and pcs
    const rate = CONVERSION_RATES[info.primary_unit.toLowerCase()]
    return rate ? amountGrams / rate : amountGrams
  }

  return normalizeQuantity(unitSize, unitType)

}

const CONVERSION_RATES: Record<string, number> = {
  "lb": 453.59,
  "oz": 28.35,
  "kg": 1000,
  "l": 1000,
  "ml": 1,
  "g": 1,
  "pcs": 1
};

function normalizeQuantity(amount: number, unit: string): number {
  const rate = CONVERSION_RATES[unit.toLowerCase()];
  return rate ? amount * rate : amount;
}
