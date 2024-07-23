import { useState } from "react"

import { FormDataTypes } from "../components/SearchForm/SearchForm"
import SearchForm from "../components/SearchForm/SearchForm"
import { searchEngineUrls } from "../data/searchEngineUrls"
import { useFetchResults } from "./useFetchResults"
import ResultPane, { ResultTypes } from "../components/ResultPane/ResultPane"
import AddModal, { AddFormDataType } from "../components/AddModal/AddModal"

const Home = () => {
  const [urls, setUrls] = useState(searchEngineUrls)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [results, setResults] = useState<ResultTypes>([])

  const { fetchData } = useFetchResults(urls);

  const updateUrls = (formData: AddFormDataType) => {
    setUrls((prevValue) => {
      const { newSearchEngine, url } = formData
      return { ...prevValue, [newSearchEngine]: url }
    })
  }

  const onSubmit = async (formValue: FormDataTypes) => {
    const data = await fetchData({ keywords: formValue.keywords, urlToFind: formValue.url, searchEngine: formValue.searchEngine })
    setResults(data as ResultTypes)
  }

  return (
    <section className="relative text-center">
      <div className="bg-gray-700 my-10 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-white mb-4">URL Finder</h1>
        <SearchForm
          onSubmit={onSubmit}
          searchEngine={Object.keys(urls)}
        />
      </div>
      <AddModal
        show={isAddModalOpen}
        updateUrls={updateUrls}
        onClose={() => setIsAddModalOpen(!isAddModalOpen)}
      />
      <button
        className="absolute bottom-28 right-2 flex items-center justify-center bg-blue-500 text-white
          w-10 h-10 rounded-full hover:bg-blue-700"
        onClick={() => setIsAddModalOpen(!isAddModalOpen)}
        role="button"
        title="Add new search engine"
      >
        +
      </button>
      <ResultPane
        results={results}
      />
    </section>
  )
}

export default Home
