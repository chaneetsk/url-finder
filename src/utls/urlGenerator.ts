// function to generate urls per page - max 10 pages
// the page number range from 01 to 10.
// Google - https://infotrack-tests.infotrack.com.au/Google/Page{01 -10}.html
// Bing - https://infotrack-tests.infotrack.com.au/Bing/Page{01 -10}.html


export const urlGenerator = (url: string, maxPages: number): string[] => {
  if(maxPages>10) maxPages = 10
  return new Array(maxPages).fill(null).map((_,i) => {
    const pageNum = (i+1).toString().padStart(2,'0')
    return `${url}Page${pageNum}.html`
  })
}
