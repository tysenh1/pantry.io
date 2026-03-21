import type { Item } from '../../../../../shared/types.ts';
import { db } from '../config/db.ts';
import type { OFFResponse } from '../types.ts';
import { randomUUID } from 'crypto';
import { type ProductV2 } from '@openfoodfacts/openfoodfacts-nodejs'
import { parseUnit, parseQuantity } from '../utils/itemUtils.ts';
import { ExternalLookupError } from '../errors/errors.ts';
import { ERROR_CODE } from '../../../constants/errorConstants.ts';

const CONVERSION_RATES: Record<string, number> = {
  "lb": 453.59,
  "oz": 28.35,
  "kg": 1000,
  "l": 1000,
  "ml": 1,
  "g": 1,
  "pcs": 1
};

function normalizeToGrams(amount: number, unit: string): number {
  const rate = CONVERSION_RATES[unit.toLowerCase()];
  return rate ? amount * rate : amount;
}

function parseListFromString(stringToParse: string): string[] {
  if (!stringToParse) return [];

  return stringToParse.split(',')
}

export const handleBarcodeLookup = async (barcode: string) => {

  console.log(barcode)
  const localItem: Item = await db.prepare(`
    SELECT * FROM item WHERE barcode = ?
  `).get(barcode);

  return localItem

  if (localItem) {
    return localItem
  }
  // const localItem: any = await db.prepare(`
  //     SELECT
  //       i.barcode,
  //       i.product_name,
  //       g.generic_name,
  //       i.brand,
  //       i.unit_size,
  //       i.unit_type,
  //       i.image_url
  //     FROM item i
  //     JOIN generic_name g ON i.generic_name_id = g.id
  //     WHERE i.barcode = ?
  //   `).get(barcode);
  //
  // if (localItem) {
  //   return localItem;
  // }

  const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
  const data: OFFResponse = await response.json();

  return data

  if (data.status == 0) {
    throw new ExternalLookupError(barcode, ERROR_CODE.EXTERNAL_LOOKUP_FAILED_CODE)
  }

  // const convertedUnit = parseUnit(data.product)
  // const quantity = parseQuantity(data.product)

  //Need to upsert here (like the stuff done in the comments below)



  // const item = db
  // const name = data.product.product_name || "Unknown Item";
  // Upsert into SQLite here
  // return name;


  const productInfo: Item = {
    code: data.product.code,
    productName: data.product.product_name ? data.product.product_name : data.product.product_name_en,
    genericName: data.product.generic_name ? data.product.generic_name : data.product.generic_name_en,
    brand: data.product.brands ? data.product.brands?.split(',')[0] : '',
    allergens: data?.product.allergens ? data.product.allergens_tags : parseListFromString(data?.product.allergens || ''),
    imageUrl: data.product.image_small_url ? data.product.image_small_url : data.product.image_url,
    quantity: data.product.quantity ? data.product.quantity : '',
    unit: parseUnit(data.product)
  }
  return productInfo
};


export const createItem = (itemInfo: Item) => {
  const itemId = randomUUID();
  const sql = `
    INSERT INTO item (id, barcode, product_name, generic_name_id, brand, unit_size, unit_type, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `

  const convertedUnit = parseUnit(itemInfo.unit as string)
  const quantity = parseQuantity

  const params = [
    itemId,
    itemInfo.code,
    itemInfo.productName || '',
    itemInfo.genericName || '',
    itemInfo.brand || '',
    itemInfo.quantity || '',
    itemInfo.unit || '',
    itemInfo.imageUrl || ''
  ]

  try {
    db.prepare(sql).run(params);
  } catch (err: any) {
    console.error("DB Error:", err);
    throw new Error(err.message);
  }

  if (itemInfo.allergens) {
    for (const allergen of itemInfo.allergens) {
      const allergenId = randomUUID()
      console.log(allergen)
      //       const sql2 = `
      //         INSERT 
      // `
    }
  }
}
