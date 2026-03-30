
export async function getAllItems() {
  const response = await fetch(`https://${import.meta.env.VITE_IP_ADDR}:3001/api/v1/items`)

  if (response) {
    return response;
  } else {
    throw new Error('Failed to fetch items')
  }
}
