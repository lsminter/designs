export default function AttAndSpells({ 
  attName1Value,
  attBonus1Value,
  attDmg1Value,
  attName2Value,
  attBonus2Value,
  attDmg2Value,
  attName3Value,
  attBonus3Value,
  attDmg3Value,
  attAndSpellsTextValue,
  setAttName1,
  setAttBonus1,
  setAttDmg1,
  setAttName2,
  setAttBonus2,
  setAttDmg2,
  setAttName3,
  setAttBonus3,
  setAttDmg3,
  setAttAndSpellsText
}) {
  return (
    <div className="flex flex-col text-center">
      <div className="flex text-center text-sm">
        <div className="text-center w-full">Name</div>
        <div className="text-center w-full">Atk Bonus</div>
        <div className="text-center w-full">Damage/Type</div>
      </div>
      <div className="space-y-1 mb-1">
        <div className="flex space-x-1">
          <input
            name="attName1"
            type="text"
            className="w-full bg-white text-black border-2"
            onChange={setAttName1}
            value={attName1Value}
          />
          <input
            name="attBonus1"
            type="text"
            className="w-full bg-white text-black border-2"
            onChange={setAttBonus1}
            value={attBonus1Value}
          />
          <input
            name="attDmg1"
            type="text"
            className="w-full bg-white text-black border-2"
            onChange={setAttDmg1}
            value={attDmg1Value}
          />
        </div>
        <div className="flex space-x-1">
          <input
            name="attName2"
            type="text"
            className="w-full bg-white text-black border-2"
            onChange={setAttName2}
            value={attName2Value}
          />
          <input
            name="attBonus2"
            type="text"
            className="w-full bg-white text-black border-2"
            onChange={setAttBonus2}
            value={attBonus2Value}
          />
          <input
            name="attDmg2"
            type="text"
            className="w-full bg-white text-black border-2"
            onChange={setAttDmg2}
            value={attDmg2Value}
          />
        </div>
        <div className="flex space-x-1">
          <input
            name="attName3"
            type="text"
            className="w-full bg-white text-black border-2"
            onChange={setAttName3}
            value={attName3Value}
          />
          <input
            name="attBonus3"
            type="text"
            className="w-full bg-white text-black border-2"
            onChange={setAttBonus3}
            value={attBonus3Value}
          />
          <input
            name="attDmg3"
            type="text"
            className="w-full bg-white text-black border-2"
            onChange={setAttDmg3}
            value={attDmg3Value}
          />
        </div>
      </div>
      <span className="text-sm w-full border-2 max-h-full">
        <textarea
          name="attackAndSpellsTextArea"
          className="w-full bg-white text-black h-40"
          type="text"
          onChange={setAttAndSpellsText}
          value={attAndSpellsTextValue}
        />
      </span>
      <p className="text-sm">Attacks & Spellcasting</p>
    </div>
  );
}
