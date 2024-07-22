type textFieldTypes = {
  textLabel: string,
  textName: string,
  textValue: string,
  placeholderText: string,
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField = ({ textLabel, textName, textValue = '', placeholderText, required = false, onChange}: textFieldTypes) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{textLabel}
        <input
          className="w-full px-3 py-2 my-1 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name={textName}
          value={textValue}
          placeholder={placeholderText}
          onChange={onChange}
          required={required}
        />
      </label>
    </div>
  )
}

export default TextField
