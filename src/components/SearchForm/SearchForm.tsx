import { useEffect, useState } from "react"

import Button from "../Button/Button"
import TextField from "../TextField/TextField"
import CheckBox from "../CheckBox/CheckBox"

export type FormDataTypes = {
  keywords: string,
  url: string,
  searchEngine: string[]
}

type SearchFormTypes = {
  onSubmit: (formData: FormDataTypes) => void,
  searchEngine: string[]
}

const initialValue:FormDataTypes = { keywords: '', url: 'https://www.infotrack.com.au', searchEngine: [] }

const SearchForm = ({ onSubmit, searchEngine }: SearchFormTypes) => {
  const [formData, setFormData] = useState<FormDataTypes>(initialValue)
  const [checkboxes, setCheckboxes] = useState(
    searchEngine.map((item) => ({ label: item, checked: false }))
  )
  const [showErr, setShowError] = useState(false)

  // update checkboxes when a new search engine is added
  useEffect(() => {
    setCheckboxes(searchEngine.map((item) => ({ label: item, checked: false })))
  }, [searchEngine])

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Ensure at least one search engine is selected and the URL is not empty
    if(formData.searchEngine.length !== 0 && formData.url !== '') {
      setShowError(false)
      onSubmit(formData)
      setFormData(initialValue)
    } else {
      setShowError(true)
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prevValue) => {
      return {...prevValue, [name]: value}
    })
  }

  const onCheckboxChangeHandler = (label: string) => {
    const updatedCheckboxes = checkboxes.map((checkbox) =>
      label === checkbox.label ? {...checkbox, checked: !checkbox.checked} : checkbox)
    const getCheckedLables = updatedCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.label)
    setCheckboxes(updatedCheckboxes)
    // also update the form data
    setFormData((prevValue) => {
      return {...prevValue, searchEngine: getCheckedLables}
    })
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <TextField
          onChange={onChangeHandler}
          textLabel="Enter Keywords"
          textName="keywords"
          textValue={formData.keywords}
          placeholderText="Keywords"
        />
        <TextField
          onChange={onChangeHandler}
          textLabel="Enter URL"
          textName="url"
          textValue={formData.url}
          placeholderText="Url"
          inputType="url"
        />
        <div>
          {checkboxes.map((checkbox) => {
            return (
              <CheckBox
                key={checkbox.label}
                label={checkbox.label}
                checked={checkbox.checked}
                onChange={() => onCheckboxChangeHandler(checkbox.label)}
              />
            )
          })
          }
        </div>
        <Button
          buttonText="submit"
          buttonType="submit"
        />
        {
          showErr &&
            <div className="bg-red-100 border border-red-400 text-red-700 mt-2 px-4 py-3 rounded relative">
              <p>Error: missing url and/or search engine</p>
            </div>
        }
      </form>
    </>
  )
}

export default SearchForm
