import type { BarcodeLookupResponse, GenericNameInfo, ItemInfo } from '../../../../../shared/types.ts';
import type { Item } from '../types.ts';
import { db } from '../config/db.ts';
import type { OFFResponse } from '../types.ts';
import { randomUUID } from 'crypto';
import { type ProductV2 } from '@openfoodfacts/openfoodfacts-nodejs'
import { parseUnit, parseQuantity, findGenericMatch, incrementQuantity } from '../utils/itemUtils.ts';
import { ExternalLookupError } from '../errors/errors.ts';
import { ERROR_CODE } from '../../../constants/errorConstants.ts';



function parseListFromString(stringToParse: string): string[] {
  if (!stringToParse) return [];

  return stringToParse.split(',')
}

export const handleBarcodeLookup = async (barcode: string): Promise<BarcodeLookupResponse> => {

  console.log(barcode)
  const localItem: Item = await db.prepare(`
    SELECT * FROM item WHERE barcode = ?
  `).get(barcode);

  if (localItem) {
    const newItemQuantity = await incrementQuantity(localItem)

    const itemInfo: ItemInfo = {
      barcode: barcode,
      productName: localItem.product_name,
      genericName: { id: '', name: '' },
      unitSize: newItemQuantity,
      unitType: localItem.unit_type
    }

    return {
      doesItemExist: true,
      item: itemInfo
    }
  }

  const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
  const data: OFFResponse = await response.json();

  if (data.status == 0) {
    throw new ExternalLookupError(barcode, ERROR_CODE.EXTERNAL_LOOKUP_FAILED_CODE)
  }

  const genericNameMatches = findGenericMatch(data.product.product_name, data.product.categories)

  const genericNames = genericNameMatches
    // @ts-ignore
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)

  const itemInfo: ItemInfo = {
    barcode: data.product.code,
    productName: data.product.product_name ? data.product.product_name as string : '',
    genericName: genericNames.map(name => name.item),
    unitSize: parseQuantity(data.product),
    unitType: parseUnit(data.product)
  }

  return {
    doesItemExist: false,
    item: itemInfo
  }
};


export const createItem = (itemInfo: Item) => {
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
