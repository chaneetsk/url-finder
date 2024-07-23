type traverseSearchResultsTypes = {
    doms: Document[],
    urlToFind: string,
    searchEngine: string
}

export const traverseSearchResults = ({doms, urlToFind, searchEngine}: traverseSearchResultsTypes): string[] => {
  let noOfResult = 0
  const results: string[] = []

  // Map to CSS selectors for different search engines
  const searchEngineClassMap = new Map([
    ['google','.g'],
    ['bing', '.b_algo'],
    ['yahoo', '.dd.algo'],
    ['duckduckgo', '.wLL07_0Xnd1QZpzpfR4W']
  ])

  const searchEngineClass = searchEngineClassMap.get(searchEngine)

  if(!searchEngineClass) {
    return ['0']
  }

  // Traverse the DOM to find the url
  doms.forEach((dom) => {
    const searchResult = dom.querySelectorAll(searchEngineClass)

    searchResult.forEach((each) => {
      noOfResult++
      const linkElement = each.querySelector('a')
      const link = linkElement?.href
      if(link?.includes(urlToFind)) {
        console.log('Found in ' + noOfResult)
        results.push(noOfResult.toString())
      }
    })
  })
  return results.length > 0 ? results : ['0']
}
