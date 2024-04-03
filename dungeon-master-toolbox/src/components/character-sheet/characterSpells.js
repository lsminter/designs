export default function CharacterSpells({
  label,
  level,
  value,
  slotsTotalValue,
  setSlotsTotalValue,
  slotsUsedValue,
  setSlotsUsedValue,
  slotsTotalName,
  slotsUsedName,
}) {
  return (
    <div className="flex flex-col text-center">
      <div className="grid grid-cols-3 text-xs">
        <div className="flex">
          <p className="w-9">Spell Level</p>
          <p
            className="self-center text-black text-xl font-bold"
          >
            {level}
          </p>
        </div>
        <div className="col-span-2">
          <div className="flex space-x-1 mr-2">
            <div className="flex">
              <p className="mr-1">Slots Total</p>
              <input
                className="w-8 text-white text-center rounded-md"
                type="number"
                name={slotsTotalName}
                value={slotsTotalValue}
                onChange={setSlotsTotalValue}
              />
            </div>
            <div className="flex">
              <p className="mr-1">Slots Used</p>
              <input
                className="w-8 text-white text-center rounded-md"
                type="number"
                name={slotsUsedName}
                value={slotsUsedValue}
                onChange={setSlotsUsedValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
