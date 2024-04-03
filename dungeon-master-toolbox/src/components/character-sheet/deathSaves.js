export default function DeathSaves({ label }) {
  return (
    <div className="flex justify-between px-1">
      <div className="content-start">
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
      </div>
      <div className="flex flex-col text-end content-start">
        <span className="text-xs">{label}</span>
      </div>
    </div>
  );
}