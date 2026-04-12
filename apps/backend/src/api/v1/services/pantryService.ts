import { GenericNameInfo, ItemInfo, PantryGenericNameResponse } from "../../../../../shared/types";
import { database } from "../config/db";
import { incrementQuantity } from "../utils/itemUtils";


export const getAllGenericNames = async (db = database): Promise<PantryGenericNameResponse[]> => {
  try {
    const names = db.prepare('SELECT p.id AS pantryId, g.id AS genericNameId, g.name, g.primary_unit as primaryUnit, g.weight_per_piece as weightPerPiece FROM pantry p JOIN generic_name g ON p.generic_name_id = g.id;').all() as PantryGenericNameResponse[]

    return names
  } catch (err) {
    console.error("DB Error:", err)
    throw new Error(err.message)
  }
}

export const quickAdd = async (item: Partial<ItemInfo>, db = database): Promise<ItemInfo> => {
  try {
    const updatedItem = incrementQuantity(item as ItemInfo, db)

    console.log(db.prepare('SELECT * FROM pantry WHERE generic_name_id = ?').get(item.genericName.id))

    return updatedItem;
  } catch (err) {
    console.error("DB Error:", err)
    throw new Error(err.message)
  }
}
