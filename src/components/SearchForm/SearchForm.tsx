import { useState } from "react"

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

const SearchForm = ({ onSubmit, searchEngine }: SearchFormTypes) => {
  const [formData, setFormData] = useState<FormDataTypes>({ keywords: '', url: 'www.infotrack.com.au', searchEngine: [] })
  const [checkboxes, setCheckboxes] = useState(
    searchEngine.map((item) => ({ label: item, checked: false }))
  )
  const [showErr, setShowError] = useState(false)

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Ensure at least one search engine is selected and the URL is not empty
    if(formData.searchEngine.length !== 0 && formData.url !== '') {
      setShowError(false)
      onSubmit(formData)
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
        />
        <Button
          buttonText="submit"
          buttonType="submit"
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
        {
          showErr &&
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <p>Error: missing url and/or search engine</p>
            </div>
        }
      </form>
    </>
  )
}

export default SearchForm
