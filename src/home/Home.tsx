import { useState } from "react"

import { FormDataTypes } from "../components/SearchForm/SearchForm"
import SearchForm from "../components/SearchForm/SearchForm"
import { searchEngineUrls } from "../data/searchEngineUrls"
import { useFetchResults } from "./useFetchResults"
import ResultPane, { ResultTypes } from "../components/ResultPane/ResultPane"

const Home = () => {
  const [urls] = useState(searchEngineUrls)
  const [results, setResults] = useState<ResultTypes>([])

  const { fetchData } = useFetchResults(urls);

  const onSubmit = async (formValue: FormDataTypes) => {
    const data = await fetchData({ keywords: formValue.keywords, urlToFind: formValue.url, searchEngine: formValue.searchEngine })
    setResults(data as ResultTypes)
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-4">URL Finder</h1>
      <SearchForm
        onSubmit={onSubmit}
        searchEngine={Object.keys(urls)}
      />
      <ResultPane
        results={results}
      />
    </>
  )
}

export default Home
