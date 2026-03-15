import type { ItemInfo } from '../../../../../shared/types.ts';
import { db } from '../config/db.ts';
import type { OFFResponse } from '../types.ts';
import { randomUUID } from 'crypto';
import { type ProductV2 } from '@openfoodfacts/openfoodfacts-nodejs'

const CONVERSION_RATES: Record<string, number> = {
  "lb": 453.59,
  "oz": 28.35,
  "kg": 1000,
  "l": 1000,
  "ml": 1,
  "g": 1
};

const UNIT_REGEX = /^([0-9.]+)\s*([a-zA-Z]+)/;

function normalizeToGrams(amount: number, unit: string): number {
  const rate = CONVERSION_RATES[unit.toLowerCase()];
  return rate ? amount * rate : amount;
}

function parseListFromString(stringToParse: string): string[] {
  if (!stringToParse) return [];

  return stringToParse.split(',')
}

function parseUnit(product) {

  if (product.product_quantity_unit) {
    return product.product_quantity_unit
  } else if (product.net_weight_unit) {
    return product.net_weight_unit
  } else if (product.product_quantity_string) {
    const regexArray = product.product_quantity_string.match(UNIT_REGEX)
    if (!regexArray) return '';
    return regexArray[1] ? regexArray[1] : ''
  } else {
    return ''
  }
}

export const handleBarcodeLookup = async (barcode: string) => {

  console.log(barcode)

  try {
    const localItem: any = await db.prepare('SELECT * FROM item WHERE barcode = ?').get(barcode);

    console.log(localItem)

    if (localItem) {
      return [localItem.unit_size, localItem.unit_type];
    }

    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data: OFFResponse = await response.json();

    if (data.status == 0) {
      return "nothing found broski"
    }


    return data;

    // if (response.data?.result) {
    //
    //   // const item = db
    //   // const name = data.product.product_name || "Unknown Item";
    //   // Upsert into SQLite here
    //   // return name;
    //
    //
    //   const productInfo: ItemInfo = {
    //     code: data.product,
    //     allergens: data?. ? data.product.allergens_tags : parseListFromString(data?.product.allergens || ''),
    //     genericName: data.product.generic_name ? data.product.generic_name : data.product.generic_name_en,
    //     imageUrl: data.product.image_small_url ? data.product.image_small_url : data.product.image_url,
    //     productName: data.product.product_name ? data.product.product_name : data.product.product_name_en,
    //     quantity: data.product.quantity ? data.product.quantity : '',
    //     unit: parseUnit(data)
    //   }
    //   return productInfo
    // }
  } catch (error) {
    console.error("OFF API Error", error);
  }
  return "Unknown Item";
};


export const createItem = (itemInfo: ItemInfo) => {
  const itemId = randomUUID();
  const sql = `
    INSERT INTO item (id, barcode, product_name, generic_name_id, brand, unit_size, unit_type, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `

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
