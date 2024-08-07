/**
 * Fetches the content from the given url and returns it as a text string
 * @param url - The url to fetch the content from
 * @returns - Promise
 */

const fetcher = async (url: string):Promise<string> => {

  const headers = {
    'method': 'GET',
    'ContentType': 'application/json'
  }

  try {
    const response = await fetch(url, headers)

    if(!response.ok) {
      throw new Error(`Error fetching from ${url}: ${response.status}`)
    }
    return await response.text()
  } catch(e) {
    console.error(`Fetch error: ${e}`)
    throw e
  }
}

export default fetcher
