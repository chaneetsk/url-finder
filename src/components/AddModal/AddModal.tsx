import { useState } from "react"

import TextField from "../TextField/TextField"
import Button from "../Button/Button"

type AddModalTypes = {
    show: boolean,
    onClose: () => void,
    setUrls: React.Dispatch<React.SetStateAction<{[key: string]: string}>>
}

const initValue = { newSearchEngine: '', url: '' }

const AddModal = ({show, onClose, setUrls}:AddModalTypes) => {
  const [formData, setFormData] = useState(initValue)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prevValue) => {
      return {...prevValue, [name]: value}
    })
  }

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUrls((prevValue) => {
      const { newSearchEngine, url } = formData
      return { ...prevValue, [newSearchEngine]: url }
    })
    handleOnClose()
  }

  const handleOnClose = () => {
    setFormData(initValue)
    onClose()
  }

  if(!show) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-gray-700 bg-opacity-70 flex items-start justify-center"
    >   
      <div
        className="fixed left-0 right-0 top-0 bottom-0 -z-10"
        onClick={handleOnClose}
        tabIndex={0}
      />
      <div className="bg-gray-500 mt-12 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add Search Engine</h2>
        <div className="modal-content">
          <form onSubmit={onSubmitForm}>
            <TextField
              onChange={onChangeHandler}
              textLabel=""
              textName="newSearchEngine"
              textValue={formData.newSearchEngine}
              required={true}
              placeholderText="Keywords"
            />
            <TextField
              onChange={onChangeHandler}
              textLabel=""
              textName="url"
              textValue={formData.url}
              required={true}
              placeholderText="Url"
            />
            <Button
              buttonText="Add"
              buttonType="submit"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddModal
