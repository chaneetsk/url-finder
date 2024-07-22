type CheckBoxTypes = {
    label: string,
    checked: boolean,
    onChange: () => void
}

const CheckBox = ({ label, checked, onChange }: CheckBoxTypes)  => {
  return (
    <div className="mt-2 flex text-gray-400">
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} className="mr-2" />
        {label}
      </label>
    </div>
  );
};

export default CheckBox
