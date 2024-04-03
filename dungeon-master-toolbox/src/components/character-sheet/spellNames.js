export default function SpellNames({
  spellName,
  spell,
  setSpell,
  checked,
  setChecked,
  checkboxName,
}) {
  return (
    <div className="flex justify-between p-1">
      <div className="self-center">
        <input
          type="checkbox"
          name={checkboxName}
          value={checked}
          onChange={setChecked}
          checked={checked === "true" || checked === true ? true : false}
        />
      </div>
      <div className="flex flex-col text-end content-start">
        <input
          name={spellName}
          value={spell}
          onChange={setSpell}
          type="text"
          className="bg-white text-black border-2"
        />
      </div>
    </div>
  );
}
