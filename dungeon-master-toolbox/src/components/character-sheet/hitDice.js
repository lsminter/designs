export default function HitDice({
  label,
  hitDice1,
  hitDice2,
  setHitDice1,
  hitDice1Value,
  setHitDice2,
  hitDice2Value
}) {
  return (
    <div className="">
      <div className="flex space-x-1 m-1">
        <div className="flex flex-col text-start content-start">
          <span className="text-xs">{label}</span>
        </div>
        <div className="justify-start">
          <input
            name={hitDice1}
            type="text"
            className="bg-white text-black border-2 w-full"
            onChange={setHitDice1}
            value={hitDice1Value}
          />
        </div>
      </div>
      <div className="justify-start m-1">
        <input
          name={hitDice2}
          type="text"
          className="bg-white text-black text-sm border-2 w-full"
          onChange={setHitDice2}
          value={hitDice2Value}
        />
      </div>
    </div>
  );
}
