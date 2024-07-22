import { renderHook, act } from '@testing-library/react'
import { useFetchResults } from '../useFetchResults'
import { expect, describe, it } from 'vitest'

const urlsObj = {
  google: 'https://infotrack-tests.infotrack.com.au/Google/',
  bing: 'https://infotrack-tests.infotrack.com.au/Bing/'
}

describe('useFetcherResult Hook', () => {
  it('should fetch and parse data from google search engine',async () => {
    const { result } = renderHook(() => useFetchResults(urlsObj))

    const fetchDataParams = {
      urlToFind: 'www.infotrack.com.au',
      searchEngine: ['google']
    }

    await act(async () => {
      const data = await result.current.fetchData(fetchDataParams)
      expect(data).toEqual([
        { google: ['1','2','4'] }
      ])
    })
  })

  it('should fetch and parse data from bing search engine',async () => {
    const { result } = renderHook(() => useFetchResults(urlsObj))

    const fetchDataParams = {
      urlToFind: 'www.infotrack.com.au',
      searchEngine: ['bing']
    }

    await act(async () => {
      const data = await result.current.fetchData(fetchDataParams)
      expect(data).toEqual([
        { bing: ['1','5'] }
      ])
    })
  })

  it('should fetch and parse data from both google and bing search engine', async () => {
    const { result } = renderHook(() => useFetchResults(urlsObj))

    const fetchDataParams = {
      urlToFind: 'www.infotrack.com.au',
      searchEngine: ['google','bing']
    }

    await act(async () => {
      const data = await result.current.fetchData(fetchDataParams)
      expect(data).toEqual([
        { google: ['1','2','4'] },
        { bing: ['1','5'] }
      ])
    })
  })

  it("should return ['0'] when no result is found", async () => {
    const { result } = renderHook(() => useFetchResults(urlsObj))

    const fetchDataParams = {
      urlToFind: 'www.xyz.com',
      searchEngine: ['google']
    }

    await act(async () => {
      const data = await result.current.fetchData(fetchDataParams)
      expect(data).toEqual([
        { google: ['0'] }
      ])
    })
  })
})
