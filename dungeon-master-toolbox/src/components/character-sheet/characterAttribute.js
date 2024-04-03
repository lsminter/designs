export default function Attribute({ label, attributeValue, setAttributeValue, name }) {
  return (
    <div className="flex flex-col text-center">
      <span className="text-center text-xs">{label}</span>
      <input
        type="number"
        value={attributeValue}
        name={name}
        onChange={setAttributeValue}
        placeholder="0"
        className="border rounded-md h-9 place-self-center text-center text-sm text-white w-14 p-1"/>
    </div>
  );
}