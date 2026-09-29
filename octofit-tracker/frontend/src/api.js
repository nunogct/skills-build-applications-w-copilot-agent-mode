export async function fetchCollection(url, { signal } = {}) {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  const collection = Array.isArray(payload)
    ? payload
    : payload?.results ?? payload?.data?.results ?? payload?.data ?? payload?.items

  if (!Array.isArray(collection)) {
    throw new Error('The API response did not contain a collection')
  }

  return collection
}
