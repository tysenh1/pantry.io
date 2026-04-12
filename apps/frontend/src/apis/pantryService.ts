import type { PantryGenericNameResponse } from "../../../shared/types";


export async function getAllGenericNames(): Promise<{ data: PantryGenericNameResponse[], message: string }> {
  const response = await fetch(`https://${import.meta.env.VITE_IP_ADDR}:3001/api/v1/pantry/generic-names`)

  if (response.ok) {
    const data: { data: pantryGenericNameResponse[], message: string } = await response.json()
    if (data.data.length == 0) {
      throw new Error('No generic names found')
    }
    return data;
  } else {
    throw new Error('Failed to fetch generic names')
  }
}
