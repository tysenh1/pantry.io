import { type ProductV2 } from "@openfoodfacts/openfoodfacts-nodejs"
import { db } from "../config/db";
import Fuse, { FuseResult } from 'fuse.js'
import { GenericNameInfo } from "../../../../../shared/types";

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
      console.log(results)
    }
  }

  const cleanedName = productName
    .replace(/\d+(\.\d+)?\s*(oz|g|ml|kg|lb|oz|pcs)/gi, '') // Strip units
    .trim();

  const results: FuseResult<GenericNameInfo>[] = fuse.search(cleanedName);
  for (const result of results) {
    searchResults.push(result)
  }

  return searchResults;
}
