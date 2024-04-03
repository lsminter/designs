function AdditionalInfo({ selectedAdditionalInfo }) {

  return (
    <div className="relative inline-block text-left px-2">
      <div>
        <p className="text-center">Add additional Info</p>
        <input className="px-4 py-2 bg-defaultButton rounded-lg w-full text-defaultText" id="info" onChange={selectedAdditionalInfo}/>
      </div>
    </div>
  );
}

export default AdditionalInfo;