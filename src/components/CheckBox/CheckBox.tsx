type CheckBoxTypes = {
    label: string,
    checked: boolean,
    onChange: () => void
}

const CheckBox = ({ label, checked, onChange }: CheckBoxTypes)  => {
  return (
    <div className="mt-4 flex items-center text-gray-400">
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} className="mr-2" />
        {label}
      </label>
    </div>
  );
};

export default CheckBox
