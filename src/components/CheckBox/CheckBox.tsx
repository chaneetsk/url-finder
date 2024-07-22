type CheckBoxTypes = {
    label: string,
    checked: boolean,
    onChange: () => void
}

const CheckBox = ({ label, checked, onChange }: CheckBoxTypes)  => {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default CheckBox
