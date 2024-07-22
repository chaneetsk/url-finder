import { describe, it, expect } from 'vitest'
import { traverseSearchResults } from '../traverseSearchResults'
import { Window } from 'happy-dom'

describe('Traverse Search Result', () => {
  const googleHTML = `
    <div class="g">
      <a href="https://www.infotrack.com.au/page1">Link 1</a>
    </div>
    <div class="g">
      <a href="https://example.com/page2">Link 2</a>
    </div>
    <div class="g">
      <a href="https://www.infotrack.com.au/page3">Link 3</a>
    </div>
    `

  const bingHTML = `
    <div class="b_algo">
      <a href="https://example.com/page1">Link 1</a>
    </div>
    <div class="b_algo">
      <a href="https://www.infotrack.com.au/page2">Link 2</a>
    </div>
    <div class="b_algo">
      <a href="https://example.com/page3">Link 3</a>
    </div>
    `
  const window = new Window()
  const googleDOM = window.document as unknown as Document
  googleDOM.body.innerHTML = googleHTML

  it('should find the correct result from Google search result', () => {
    const results = traverseSearchResults({
      doms: [googleDOM],
      urlToFind: 'www.infotrack.com.au',
      searchEngine: 'google'
    })
    expect(results).toEqual(['1','3'])
  })

  it('should find the correct result from Bing search result', () => {
    const window = new Window()
    const bingDOM = window.document as unknown as Document
    bingDOM.body.innerHTML = bingHTML
    const results = traverseSearchResults({
      doms: [bingDOM],
      urlToFind: 'www.infotrack.com.au',
      searchEngine: 'bing'
    })
    expect(results).toEqual(['2'])
  })

  it('should return ["0"] if the URL is not found', () => {
    const results = traverseSearchResults({
      doms: [googleDOM],
      urlToFind: 'www.xyz.com',
      searchEngine: 'google'
    })

    expect(results).toEqual(['0'])
  })

  it('should return ["0"] for unsupported search engines', () => {
    const results = traverseSearchResults({
      doms: [googleDOM],
      urlToFind: 'www.xyz.com',
      searchEngine: 'duckduckgo'
    })

    expect(results).toEqual(['0'])
  })
})
