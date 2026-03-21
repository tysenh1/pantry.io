import type { BarcodeLookupResponse, GenericNameInfo, ItemInfo } from '../../../../../shared/types.ts';
import type { GenericName, Item } from '../types.ts';
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
    const itemWithNewQuantity = await incrementQuantity(localItem)

    const genericName: GenericName = await db.prepare('SELECT * FROM generic_name WHERE id = ?').get(itemWithNewQuantity.generic_name_id)

    const itemInfo: ItemInfo = {
      barcode: itemWithNewQuantity.barcode,
      productName: itemWithNewQuantity.product_name,
      genericName: [{ id: genericName.id, name: genericName.name }],
      unitSize: itemWithNewQuantity.unit_size,
      unitType: itemWithNewQuantity.unit_type
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


export const createItem = (itemInfo: ItemInfo) => {
  const itemId = randomUUID();
  const sql = `
    INSERT INTO item (id, barcode, product_name, generic_name_id, unit_size, unit_type)
    VALUES (?, ?, ?, ?, ?, ?);
  `

  const params = [
    itemId,
    itemInfo.barcode,
    itemInfo.productName,
    itemInfo.genericName[0].id,
    itemInfo.unitSize,
    itemInfo.unitType,
  ]

  try {
    db.prepare(sql).run(params);
  } catch (err: any) {
    console.error("DB Error:", err);
    throw new Error(err.message);
  }


}
