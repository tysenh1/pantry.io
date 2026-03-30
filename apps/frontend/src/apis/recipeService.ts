import { type Recipe } from "../../../shared/types"

export async function addRecipe(recipe: Recipe) {
  const response = await fetch(`https://${import.meta.env.VITE_IP_ADDR}:3001/api/v1/recipe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(recipe)
  })

  if (response) {
    return response
  } else {
    throw new Error('Failed to update recipe.')
  }
}

