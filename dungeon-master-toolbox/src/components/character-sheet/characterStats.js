export default function CharacterStats({
  label,
  setStatValue,
  name,
  nameModifier,
  statValue,
  setModifierValue,
  modifierValue,
}) {
  return (
    <div className="flex flex-col text-center justify-center items-center">
      <span className="text-sm">{label}</span>
      <input
        name={name}
        className="border rounded-md p-1 text-2xl text-white w-14"
        type="number"
        placeholder="1"
        onChange={setStatValue}
        value={statValue}
      />
      <p className="text-xs">mod</p>
      <input
        name={nameModifier}
        className="border rounded-md p-1 text-sm text-white w-14"
        type="number"
        placeholder="1"
        onChange={setModifierValue}
        value={modifierValue}
      />
    </div>
  );
}
