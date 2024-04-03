const MonsterCard = (monsters) => {
  const monster = monsters.monsters;

  return (
    <div className="grid grid-cols-2 p-2 bg-defaultButton rounded-md">
      <div className="pb-2 space-y-2">
        <div>
          <p name="monsterName" value={monster.name}className="text-2xl">{monster.name}</p>
          <h2 className="flex space-x-2">
            <div>
              <p className="text-sm">Total HP:</p>
              <p>{monster.hit_points}</p>
            </div>
            <div>
              <p className="text-sm">Damage Taken:</p>
              <input
                placeholder={monster.hit_points}
                className="w-16 mx-2 p-1 bg-[#FF8793] text-black rounded-md text-sm"
                type="number"
              />
            </div>
            <div>
              <p className="text-sm">Initiative</p>
              <input
                placeholder='0'
                className="w-12 mx-2 p-1 bg-[#FF8793] text-black rounded-md text-sm text-center"
                type="number"
              />
            </div>
          </h2>
        </div>
        <p
          name="monsterType"
          value={monster.type}
        >
          Type: {monster.type}
        </p>
        <p>Alignment: {monster.alignment}</p>
        <p>Languages: {monster.languages}</p>
        <p>Armor Class: {monster.armor_class}</p>
        <div className="grid grid-cols-2">
          <p>Str: {monster.strength}</p>
          <p>Dex: {monster.dexterity}</p>
          <p>Con: {monster.constitution}</p>
          <p>Int: {monster.intelligence}</p>
          <p>Wis: {monster.wisdom}</p>
          <p>Char: {monster.charisma}</p>
        </div>
        <div className="flex">
          <p className="mr-1">Speed:</p>
          <p className="flex space-x-1">
              {Object.entries(monster.speed).map(([key, val]) => {
                return <p key={key}>{key}:{val}</p>
              })}
            </p> 
        </div>
        <div className="grid grid-cols-2">
          <p>Str Save: {monster.strength_save}</p>
          <p>Dex Save: {monster.dexterity_save}</p>
          <p>Con Save: {monster.constitution_save}</p>
          <p>Int Save: {monster.intelligence_save}</p>
          <p>Wis Save: {monster.wisdom_save}</p>
          <p>Char Save: {monster.charisma_save}</p>
        </div>
        <p>
          Damage Vulnerabilities:{" "}
          {monster.damage_vulnerabilities
            ? monster.damage_vulnerabilities
            : "None"}
        </p>
        <p>
          Damage Resistances:{" "}
          {monster.damage_resistances ? monster.damage_resistances : "None"}
        </p>
        <p>
          Damage Immunities:{" "}
          {monster.damage_immunities ? monster.damage_immunities : "None"}
        </p>
        <p>
          Condition Immunities:{" "}
          {monster.condition_immunities ? monster.condition_immunities : "None"}
        </p>
        <p>Senses: {monster.senses ? monster.senses : "None"}</p>
      </div>

      <div>
        <h2 className="space-y-2">
          <p className="text-2xl">Actions</p>
          {monster.actions === "" ? (
            <p>No actions</p>
          ) : (
            <div>
              {monster.actions.map((actions) => {
                return (
                  <h3 key={actions.name}>
                    <p className="text-lg italic">{actions.name}:</p>{" "}
                    <p className="text-sm">{actions.desc}</p>
                  </h3>
                );
              })}
            </div>
          )}
        </h2>

        <h2>
          <p className="text-xl">Legendary Actions</p>
          {monster.legendary_actions === "" ? (
            <p>No Legendary Actions</p>
          ) : (
            <div>
              {monster.legendary_actions.map((actions) => {
                return (
                  <h3 key={actions.name}>
                    <p className="text-lg italic">{actions.name}:</p>{" "}
                    <p className="text-sm">{actions.desc}</p>
                  </h3>
                );
              })}
            </div>
          )}
        </h2>
      </div>
    </div>
  );
};

export default MonsterCard;
