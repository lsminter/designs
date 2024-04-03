import { useState, useEffect } from "react";
import { useUserContext } from "../../../context/user";
import toast from "react-hot-toast";

const NpcCard = ({ npcNameValue, npcDescriptionValue, npcBackgroundValue, currentNpcId }) => {
  const { user, supabase } = useUserContext();

  const [npcName, setNpcName] = useState(!npcNameValue ? "" : npcNameValue);
  const [npcDescription, setNpcDescription] = useState(
    !npcDescriptionValue ? "" : npcDescriptionValue
  );
  const [npcBackground, setNpcBackground] = useState(
    !npcBackgroundValue ? "" : npcBackgroundValue
  );
  const [savedNpcs, setSavedNpcs] = useState([]);
  const [npcId, setNpcId] = useState(!currentNpcId ? "" : currentNpcId);

  const npcs = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "npcs" },
      (payload) => {
        console.log("Change received!", payload);
      }
    )
    .subscribe();

  const handleSaveNpc = async (e) => {
    e.preventDefault();

    const fetchNpcs = async () => {
      if (user) {
        const { data: npcs, error } = await supabase
          .from("npcs")
          .select("*")
          .eq("user_id", user.id);
        console.log(npcs);
        const npcArray = [];
        npcs.map((npc) => {
          npcArray.push(npc.npc_name);
        });
        setSavedNpcs(npcArray);
      }
    };

    fetchNpcs();

    if (savedNpcs.includes(npcName)) {
      return alert(
        "You already have an NPC with that name. Please choose a different name."
      );
    } else {
      const { error } = await supabase.from("npcs").insert({
        user_id: user.id,
        npc_name: npcName,
        npc_description: npcDescription,
        npc_background: npcBackground,
      });

      const { data: newNpc, error: newNpcError } = await supabase
        .from("npcs")
        .select("*")
        .eq("npc_name", npcName)
        .eq("user_id", user.id);

      setNpcId(newNpc[0].id);

      toast.success(`${npcName} Saved!`);
    }
  };

  const handleUpdateNpc = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("npcs")
      .update({
        npc_name: npcName,
        npc_description: npcDescription,
        npc_background: npcBackground,
      })
      .eq("id", npcId);

    toast.success(`${npcName} Updated!`);
  };

  const handleDeleteNpc = async (id) => {
    const { data, error } = await supabase
    .from('npcs')
    .delete()
    .eq('id', npcId)

    setNpcId("");

    toast.success(`${npcName} Deleted! Click Save NPC to undo the delete.`, {
      duration: 8000,
    })
  }

  return (
    <div className="grid">
      <h2 className="text-center text-3xl font-bold m-4">{npcName}</h2>
      <div className="flex gap-4 place-self-center">
        <div className="grid md:flex gap-4 justify-center place-items-center">
          <button
            className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500 self-center"
            id="delete"
            onClick={(e) => handleDeleteNpc(npcId)}
          >
            Delete NPC
          </button>
        </div>
        <button
          onClick={!npcId ? handleSaveNpc : handleUpdateNpc}
          type="submit"
          className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500 self-center"
        >
          {!npcId ? <p>Save NPC</p> : <p>Update NPC</p>}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 m-4 space-y-2 md:space-y-4 gap-x-12">
        <div>
          <h1 className="font-bold text-2xl text-center md:text-left">Name</h1>
          <input
            className="border rounded-md p-2 text-lg w-full text-white bg-gray-700"
            value={npcName}
            onChange={(e) => setNpcName(e.target.value)}
          />
          <h1 className="font-bold text-2xl text-center md:text-left">
            Description
          </h1>
          <textarea
            className="w-full text-white bg-gray-700 h-32 rounded-md p-2"
            value={npcDescription}
            onChange={(e) => setNpcDescription(e.target.value)}
          >
            {npcDescription}
          </textarea>
        </div>
        <div>
          <h1 className="font-bold text-2xl text-center md:text-left">
            Background
          </h1>
          <textarea
            className="w-full text-white bg-gray-700 h-48 rounded-md p-2"
            value={npcBackground}
            onChange={(e) => setNpcBackground(e.target.value)}
          >
            {npcBackground}
          </textarea>
        </div>
      </div>
    </div>
  );
};

export default NpcCard;
