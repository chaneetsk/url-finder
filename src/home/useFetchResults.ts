// import { useState } from "react"
import fetcher from "../fetcher/fetcher"
import { urlGenerator } from "../utls/urlGenerator"
import { domParser } from "../utls/domParser"
import { traverseSearchResults } from "../utls/traverseSearchResults"

const MAX_PAGES = 5

type fetchDataTypes = {
    keywords?: string,
    urlToFind: string,
    searchEngine: string[]
}

type urlsType = {
    [key: string]: string
}

// Custom hook to fetch page concurrently form url with pages
// The response is then passed through the dom parser
export const useFetchResults = (urlsObj: urlsType) => {

  const fetchFromUrlsConcurrently = async (urls: string[]) => {
    try{
      const fetchPromises = urls.map(async(url) => {
        const result = await fetcher(url)
        return result;
      })
      return await Promise.all(fetchPromises)
    }catch(e){
      console.error(e)
      throw e
    }
  }

  const fetchData = async ({urlToFind, searchEngine}: fetchDataTypes) => {
    let results:Record<string, string[]>[] = []

    try {
      // Iterate through each selected search engine
      for(const sE of searchEngine) {
        const url = getUrlOfSearchEngine(urlsObj, sE)

        // Since we are only interested in the first 50 results,
        // Generating only first 5 pages.
        const urlsWithPages = urlGenerator(url, MAX_PAGES)
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
      results = []
    }
  }

  return {
    fetchData
  }
}

// get url of the search engine from json object
const getUrlOfSearchEngine = (urlsObj: urlsType, searchEngine: string) => {
  return urlsObj[searchEngine]
}

