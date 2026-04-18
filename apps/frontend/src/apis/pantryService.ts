import type { ItemInfo, PantryGenericNameResponse } from "../../../shared/types";


export async function getAllGenericNames(): Promise<{ data: PantryGenericNameResponse[], message: string }> {
  const response = await fetch(`https://${import.meta.env.VITE_IP_ADDR}:3001/api/v1/pantry/generic-names`)

  if (response.ok) {
    const data: { data: PantryGenericNameResponse[], message: string } = await response.json()
    if (data.data.length == 0) {
      throw new Error('No generic names found')
    }
    return data;
  } else {
    throw new Error('Failed to fetch generic names')
  }
}

export async function quickAdd(item: Partial<ItemInfo>): Promise<{ data: ItemInfo, message: string }> {
  const response = await fetch(`https://${import.meta.env.VITE_IP_ADDR}:3001/api/v1/pantry/quick-add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(item)

  })

  if (response.ok) {
    const data: { data: ItemInfo, message: string } = await response.json()
    if (!data.data) {
      throw new Error('Unable to update pantry quantity')
    }
    return data;
  } else {
    throw new Error('Failed to update pantry item.')
  }
}
