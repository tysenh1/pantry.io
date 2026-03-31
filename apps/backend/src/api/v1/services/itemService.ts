import type { BarcodeLookupResponse, GenericNameInfo, ItemInfo } from '../../../../../shared/types.ts';
import type { GenericName, Item, QuantityUpdateInfo } from '../types.ts';
import { db } from '../config/db.ts';
import type { OFFResponse } from '../types.ts';
import { randomUUID } from 'crypto';
import { type ProductV2 } from '@openfoodfacts/openfoodfacts-nodejs'
import { parseUnit, parseQuantity, findGenericMatch, incrementQuantity, addQuantity } from '../utils/itemUtils.ts';
import { ExternalLookupError } from '../errors/errors.ts';
import { ERROR_CODE } from '../../../constants/errorConstants.ts';



function parseListFromString(stringToParse: string): string[] {
  if (!stringToParse) return [];

  return stringToParse.split(',')
}

export const handleBarcodeLookup = async (barcode: string): Promise<BarcodeLookupResponse> => {

  console.log(barcode)
  const localItem: {
    id: string,
    barcode: string,
    product_name: string,
    generic_name_id: string,
    unit_size: number,
    unit_type: string,
    name: string,
    primary_unit: string,
    weight_per_piece: number
  } = await db.prepare(`
    SELECT * FROM item JOIN generic_name ON item.generic_name_id = generic_name.id WHERE barcode = ?
  `).get(barcode);


  if (localItem) {
    const itemWithNewQuantity = await incrementQuantity({
      barcode: localItem.barcode,
      productName: localItem.product_name,
      genericName: { id: localItem.generic_name_id, name: localItem.name },
      unitType: localItem.unit_type,
      unitSize: localItem.unit_size
    })


    return {
      doesItemExist: true,
      item: itemWithNewQuantity,
      genericNames: [itemWithNewQuantity.genericName]
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
    .map(result => { return result.item })

  const itemInfo: Omit<ItemInfo, 'genericName'> = {
    barcode: data.product.code,
    productName: data.product.product_name ? data.product.product_name as string : '',
    unitSize: parseQuantity(data.product),
    unitType: parseUnit(data.product)
  }

  return {
    doesItemExist: false,
    item: itemInfo,
    // could just drop genericNames here, honestly not sure and have bigger fish to fry right now
    genericNames: [...genericNames]
  }
};


export const createItem = async (itemInfo: ItemInfo): Promise<ItemInfo> => {
  const itemId = randomUUID();
  const sql = `
    INSERT INTO item (id, barcode, product_name, generic_name_id, unit_size, unit_type)
    VALUES (?, ?, ?, ?, ?, ?);
  `

  const params = [
    itemId,
    itemInfo.barcode,
    itemInfo.productName,
    itemInfo.genericName.id,
    itemInfo.unitSize,
    itemInfo.unitType,
  ]

  try {
    db.prepare(sql).run(params);
  } catch (err: any) {
    console.error("DB Error:", err);
    throw new Error(err.message);
  }

  // This can probably be simplified to just check if it exists instead of doing the whole query
  const pantryItem = db.prepare('SELECT * FROM pantry WHERE generic_name_id = ?').get(itemInfo.genericName.id)

  if (pantryItem) {
    const itemWithNewQuantity = await incrementQuantity(itemInfo)

    return itemWithNewQuantity
  } else {
    const pantryId = randomUUID()
    const sql2 = `
INSERT INTO pantry (id, generic_name_id, quantity, is_staple)
VALUES (?, ?, ?, ?);
`
    const pantryParams = [
      pantryId,
      itemInfo.genericName.id,
      0,
      0
    ]

    try {
      db.prepare(sql2).run(params)
      const itemWithNewQuantity = incrementQuantity(itemInfo)
      return itemWithNewQuantity
    } catch (err: any) {
      console.error("DB Error:", err);
      throw new Error(err.message)
    }
  }

}
