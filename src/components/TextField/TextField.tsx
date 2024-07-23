type textFieldTypes = {
  textLabel: string,
  textName: string,
  textValue: string,
  placeholderText: string,
  required?: boolean,
  inputType?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField = ({
  textLabel,
  textName,
  textValue = '',
  placeholderText,
  required = false,
  inputType = 'text',
  onChange}: textFieldTypes) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{textLabel}
        <input
          className="w-full px-3 py-2 my-1 text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type={inputType}
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
