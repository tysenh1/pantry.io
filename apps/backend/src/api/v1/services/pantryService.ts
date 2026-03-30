import { GenericNameInfo, pantryGenericNameResponse } from "../../../../../shared/types";
import { db } from "../config/db";


export const getAllGenericNames = async (): Promise<pantryGenericNameResponse[]> => {
  try {
    const names = await db.prepare('SELECT p.id AS pantryId, g.name, g.primary_unit FROM pantry p JOIN generic_name g ON p.generic_name_id = g.id;').all()

    return names
  } catch (err) {
    console.error("DB Error:", err)
    throw new Error(err.message)
  }
}
