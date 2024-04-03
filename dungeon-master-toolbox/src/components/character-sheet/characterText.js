export default function CharacterText({ label, textAreaValue, setTextAreaValue, textAreaName }) {
  return (
    <div className="flex flex-col text-center">
      <span className="text-sm">{label}</span>
      <span className="text-sm w-full border-2 max-h-full">
        <textarea
          name={textAreaName}
          className="w-full bg-white text-black h-24 text-sm"
          type="text"
          onChange={setTextAreaValue}
          value={textAreaValue}
        />
      </span>
    </div>
  );
}
