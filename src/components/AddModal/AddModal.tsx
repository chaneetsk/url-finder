import { useState } from "react"

import TextField from "../TextField/TextField"
import Button from "../Button/Button"

export type AddFormDataType = {
  newSearchEngine: string,
  url: string
}

type AddModalTypes = {
    show: boolean,
    onClose: () => void,
    updateUrls: (formData: AddFormDataType) => void
}

const initValue = { newSearchEngine: '', url: '' }

const AddModal = ({show, onClose, updateUrls}:AddModalTypes) => {
  const [formData, setFormData] = useState<AddFormDataType>(initValue)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prevValue) => {
      return {...prevValue, [name]: value}
    })
  }

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUrls(formData)
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
        data-testid="overlay"
        className="fixed left-0 right-0 top-0 bottom-0"
        style={{ zIndex: -1 }}
        onClick={handleOnClose}
        tabIndex={0}
      />
      <div className="bg-gray-500 mt-12 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add Search Engine</h2>
        <div className="modal-content">
          <form
            onSubmit={onSubmitForm}
            role="form"
          >
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
