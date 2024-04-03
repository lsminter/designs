export default function SavingThrows({
  label,
  setSavingValue,
  statSavingValue,
  savingName,
  checkboxName,
  checked,
  setChecked
}) {
  return (
    <div className="flex justify-between">
      <input 
        type="checkbox" 
        name={checkboxName}
        value={checked}
        onChange={setChecked}
        checked={checked}
      />
      <div className="flex flex-col text-end justify-end items-end">
        <span className="text-xs">{label}</span>
        <input
          name={savingName}
          className="text-xs w-10 pl-1 bg-white text-black"
          type="number"
          placeholder="1"
          onChange={setSavingValue}
          value={statSavingValue}
        />
      </div>
    </div>
  );
}
