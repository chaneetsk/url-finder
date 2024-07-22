
import { useState } from "react"

import { FormDataTypes } from "../components/SearchForm/SearchForm"
import SearchForm from "../components/SearchForm/SearchForm"
import { searchEngineUrls } from "../data/searchEngineUrls"
import { useFetchResults } from "./useFetchResults"

const Home = () => {
  const [urls] = useState(searchEngineUrls)
  const [results, setResults] = useState<Record<string, string[]>[]>([])

  const { fetchData } = useFetchResults(urls);

  const onSubmit = async (formValue: FormDataTypes) => {
    const data = await fetchData({ keywords: formValue.keywords, urlToFind: formValue.url, searchEngine: formValue.searchEngine })
    setResults(data)
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-4">URL Finder</h1>
      <SearchForm
        onSubmit={onSubmit}
        searchEngine={Object.keys(urls)}
      />
      <section>
        <p className="text-lg font-bold text-white">Results</p>
        {
          results.map((result) => {
            for(const [key, value] of Object.entries(result)) {
              return (
                <p key={key}>
                  <span>{key}</span>: <span>{value.flat()}</span>
                </p>
              )
            }
          })
        }
      </section>
    </>
  )
}

export default Home
