// import { useState } from "react"
import fetcher from "../fetcher/fetcher"
import { urlGenerator } from "../utls/urlGenerator"
import { domParser } from "../utls/domParser"
import { traverseSearchResults } from "../utls/traverseSearchResults"
import { useState } from "react"

const MAX_PAGES: number = 5
const INFO_TRACK_TEST_WEBSITE: string = 'infotrack-tests.infotrack.com.au'

type fetchDataTypes = {
    keywords?: string,
    urlToFind: string,
    searchEngine: string[]
}

type urlsType = Record<string, string>

// Custom hook to fetch page concurrently form url with pages
// The response is then passed through the dom parser
export const useFetchResults = (urlsObj: urlsType) => {
  const [error, setError] = useState('')

  const fetchFromUrlsConcurrently = async (urls: string[]) => {
    try{
      const fetchPromises = urls.map(async(url) => {
        const result = await fetcher(url)
        return result
      })
      return await Promise.all(fetchPromises)
    }catch(e){
      console.error(e)
      throw e
    }
  }

  const fetchData = async ({keywords = '', urlToFind, searchEngine}: fetchDataTypes) => {
    let results:Record<string, string[]>[] = []

    try {
      // Iterate through each selected search engine
      for(const sE of searchEngine) {
        const url = getUrlOfSearchEngine(urlsObj, sE)
        let urlsWithPages:string[] = []

        // The test static web pages are being used
        // Since we are only interested in the first 50 results, generate only first 5 pages
        // Generate static pages for only 'https://infotrack-tests.infotrack.com.au/'
        if(url.includes(INFO_TRACK_TEST_WEBSITE)) {
          urlsWithPages = urlGenerator(url, MAX_PAGES)
        } else {
          // Do not generate any static pages
          const newUrl = new URL(url)
          const params = new URLSearchParams({ q: keywords })
          newUrl.search = params.toString()
          urlsWithPages.push(newUrl.toString())
        }

        const htmlPageArray = await fetchFromUrlsConcurrently(urlsWithPages)

        // Parse the html string
        const doms:Document[] = []
        htmlPageArray.forEach((page) => {
          doms.push(domParser(page))
        })

        results = [...results, {[sE]: traverseSearchResults({ doms, urlToFind, searchEngine: sE })}]
      }

      return results
    } catch (e) {
      console.error(e)
      setError('Error Fetching Request')
      results = []
    }
  }

  return {
    fetchData,
    error
  }
}

// get url of the search engine from json object
const getUrlOfSearchEngine = (urlsObj: urlsType, searchEngine: string) => {
  return urlsObj[searchEngine]
}
