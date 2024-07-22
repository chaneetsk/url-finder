// Utility function to parse the html string using DOMParser
export const domParser = (domString: string): Document => {
  const parser = new DOMParser()
  const dom = parser.parseFromString(domString, "text/html")
  return dom
}
