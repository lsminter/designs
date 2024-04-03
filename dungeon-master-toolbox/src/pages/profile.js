import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

import FullCharacterSheet from "../components/character-sheet/fullCharacterSheet.js";
import { useUserContext } from "../../context/user";
import MonsterCard from "../components/random-encounter/monster-cards.js";
import NpcCard from "../components/npc-components/npc-component.js";

const Profile = () => {
  const session = useSessionContext();
  const { user, logout } = useUserContext();

  const router = useRouter();
  const supabase = useSupabaseClient();
  const [pcs, setPcs] = useState();
  const [pc, setPc] = useState();
  const [encounters, setEncounters] = useState(null);
  const [encounter, setEncounter] = useState();
  const [npcs, setNpcs] = useState();
  const [npc, setNpc] = useState();
  const [toggledButtonId, setToggledButtonId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { data: pcs, error: err } = await supabase
          .from("pc_characters")
          .select("*")
          .eq("id", user.id);

        setPcs(pcs);

        const { data: userEncounters, error: err2 } = await supabase
          .from("monster_encounters")
          .select("*")
          .eq("user_id", user.id);

        setEncounters(userEncounters);

        const { data: userNpcs, error: err3 } = await supabase
          .from("npcs")
          .select("*")
          .eq("user_id", user.id);

        setNpcs(userNpcs);

        const encounterSubscription = supabase
          .channel("custom-all-channel")
          .on("postgres_changes", {
            event: "*",
            schema: "public",
            table: "monster_encounters",
          })
          .subscribe();

        const npcs = supabase
          .channel("custom-all-channel")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "npcs" },
          )
          .subscribe();
      }
    };
    fetchData();
  }, [supabase, user]);

  const loadPortal = async () => {
    const { data } = await axios.get("/api/portal");
    router.push(data.url);
  };

  const handlePc = async (pc) => {
    const { data: pcs, error } = await supabase
      .from("pc_characters")
      .select("*")
      .eq("id", user.id)
      .eq("pc_name", pc);

    setPc(pcs[0]);
  };

  const handleEncounter = async (selectedEncounter) => {
    const { data: singleEncounter, error } = await supabase
      .from("monster_encounters")
      .select("*")
      .eq("user_id", user.id)
      .eq("encounter_name", selectedEncounter);

    setEncounter(singleEncounter[0]);
  };

  const handleDeleteEncounter = async (encounter) => {
    const { data: deletedEncounter, error } = await supabase
      .from("monster_encounters")
      .delete()
      .eq("id", encounter);

    toast.success("Encounter Deleted!");
    setEncounter(null);
  };

  const handleNpc = async (selectedNpc) => {
    const { data: singleNpc, error } = await supabase
      .from("npcs")
      .select("*")
      .eq("user_id", user.id)
      .eq("npc_name", selectedNpc);

    setNpc(singleNpc[0]);
  };

  return (
    <div className="min-h-screen">
      {session.isLoading ? (
        <div />
      ) : (
        <div className="mt-8">
          {!user ? (
            <div className="p-4">
              <Auth
                redirectTo={`${process.env.CLIENT_URL}/profile`}
                appearance={{ theme: ThemeSupa }}
                supabaseClient={supabase}
                providers={["google"]}
                socialLayout="horizontal"
              />
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 text-center m-4 space-x-4">
                <div className="grid grid-cols-1">
                  <h1 className="text-2xl">
                    {user?.email ? (
                      <div className="grid justify-items-center">
                        {user?.email}
                      </div>
                    ) : (
                      <div className="grid justify-items-center">
                        {user?.user_metadata?.email}
                      </div>
                    )}
                  </h1>
                  <div className="grid grid-cols-1 justify-items-center space-y-2">
                    <button
                      className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                      onClick={() => logout()}
                    >
                      LOGOUT
                    </button>
                    <button
                      className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                      id="pc"
                      onClick={(e) => setToggledButtonId(e.target.id)}
                    >
                      Saved PC&apos;s
                    </button>
                    <button
                      className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                      id="npc"
                      onClick={(e) => setToggledButtonId(e.target.id)}
                    >
                      Saved NPC&apos;s
                    </button>
                    <button
                      className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                      id="encounter"
                      onClick={(e) => setToggledButtonId(e.target.id)}
                    >
                      Saved Encounters
                    </button>
                    <button
                      className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                      id="campaign"
                      onClick={(e) => setToggledButtonId(e.target.id)}
                    >
                      Saved Campaigns
                    </button>
                  </div>
                </div>
                <div className="w-full h-full justify-self-center">
                  <Image
                    alt="site logo"
                    src="/images/logos/white-logo.svg"
                    width={300}
                    height={300}
                  />
                  <div className="mt-8 space-y-2">
                    {user?.is_subscribed ? (
                      <div className="text-center space-y-2">
                        <p>Subscription Status: {user?.interval}</p>
                        <button
                          className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500"
                          onClick={loadPortal}
                        >
                          Manage Subscription
                        </button>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <p>Subscription Status: Not Subscribed</p>
                        <button className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500">
                          <Link href="/pricing">Click to go to pricing</Link>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!user?.is_subscribed && (
                <div className="grid justify-items-center">
                  <p className="w-1/2 text-center p-2">
                    Even if you aren&apos;t subscribed, everything is still
                    being saved. Subscribe to view all of your saved items.
                  </p>
                </div>
              )}

              {toggledButtonId === "pc" && (
                <div className="grid">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
                    {user?.is_subscribed
                      ? pcs?.map((pc) => (
                          <ul key={pc.pc_id}>
                            <button
                              className="hover:bg-gray-500 bg-defaultButton rounded-md h-[64px] w-52 m-2 p-2 text-center overflow-hidden"
                              value={pc.pc_name}
                              onClick={(e) => {
                                handlePc(e.target.value);
                              }}
                            >
                              {pc.pc_name}
                            </button>
                          </ul>
                        ))
                      : pcs?.slice(0, 2).map((pc) => (
                          <ul key={pc.pc_name}>
                            <button
                              className="hover:bg-gray-500 bg-defaultButton rounded-md h-[64px] w-52 m-2 p-2 text-center overflow-hidden"
                              value={pc.pc_name}
                              onClick={(e) => {
                                handlePc(e.target.value);
                              }}
                            >
                              {pc.pc_name}
                            </button>
                          </ul>
                        ))}
                  </div>
                  {!pcs && (
                    <div className="grid justify-items-center">
                      <p className="flex">
                        You have no saved PC&apos;s. Go to the
                        <Link href="/pc-generator">
                          <p className="text-defaultText font-bold mx-1 hover:cursor-pointer hover:text-gray-600 ">
                            PC Generator
                          </p>
                        </Link>
                        to create one.
                      </p>
                    </div>
                  )}
                  {!pc ? (
                    <div />
                  ) : (
                    <div className="grid justify-items-center">
                      <FullCharacterSheet
                        key={pc.pc_name}
                        currentPc={pc}
                        pc_id={pc.pc_id}
                      />
                    </div>
                  )}
                </div>
              )}

              {toggledButtonId === "npc" && (
                <div className="flex gap-4 justify-center">
                  <div className="grid w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
                      {user?.is_subscribed
                        ? npcs?.map((npcs) => (
                            <ul key={npcs.id}>
                              <button
                                className="hover:bg-gray-500 bg-defaultButton rounded-md h-[64px] w-52 m-2 p-2 text-center overflow-hidden"
                                value={npcs.npc_name}
                                onClick={(e) => {
                                  handleNpc(e.target.value);
                                }}
                              >
                                {npcs.npc_name}
                              </button>
                            </ul>
                          ))
                        : npcs?.slice(0, 2).map((npcs) => (
                            <ul key={npcs.id}>
                              <button
                                className="hover:bg-gray-500 bg-defaultButton rounded-md h-[64px] w-52 m-2 p-2 text-center overflow-hidden"
                                value={npcs.npc_name}
                                onClick={(e) => {
                                  handleNpc(e.target.value);
                                }}
                              >
                                {npcs.npc_name}
                              </button>
                            </ul>
                          ))}
                    </div>
                    {!npcs && (
                      <div className="grid justify-items-center">
                        <p className="flex">
                          You have no saved NPC&apos;s. Go to the
                          <Link href="/npc-generator">
                            <p className="text-defaultText font-bold mx-1 hover:cursor-pointer hover:text-gray-600 ">
                              NPC Generator
                            </p>
                          </Link>
                          to create one.
                        </p>
                      </div>
                    )}
                    {!npc ? (
                      <div />
                    ) : (
                      <div className="grid">
                        <NpcCard
                          key={npc.id}
                          currentNpcId={npc.id}
                          npcNameValue={npc.npc_name}
                          npcDescriptionValue={npc.npc_description}
                          npcBackgroundValue={npc.npc_background}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {toggledButtonId === "encounter" && (
                <div className="flex gap-4 justify-center">
                  <div className="grid">
                    <div className="flex gap-4 justify-center">
                      {user?.is_subscribed
                        ? encounters?.map((encounter) => (
                            <ul key={encounter.encounter_name}>
                              <button
                                className="bg-defaultButton rounded-md p-2 justify-self-center"
                                value={encounter.encounter_name}
                                onClick={(e) => {
                                  handleEncounter(e.target.value);
                                }}
                              >
                                {encounter.encounter_name}
                              </button>
                            </ul>
                          ))
                        : encounters?.slice(0, 2).map((encounter) => (
                            <ul key={encounter.encounter_name}>
                              <button
                                className="bg-defaultButton rounded-md p-2 justify-self-center"
                                value={encounter.encounter_name}
                                onClick={(e) => {
                                  handleEncounter(e.target.value);
                                }}
                              >
                                {encounter.encounter_name}
                              </button>
                            </ul>
                          ))}
                    </div>
                    {console.log({ encounter: encounters })}
                    {!encounters && (
                      <div className="grid justify-items-center">
                      {console.log({ encounter: encounters })}
                      test
                        <p className="flex">
                          You have no saved Encounters&apos;s. Go to the
                          <Link href="/encounter-generator">
                            <p className="text-defaultText font-bold mx-1 hover:cursor-pointer hover:text-gray-600 ">
                              Encounter Generator
                            </p>
                          </Link>
                          to create one.
                        </p>
                      </div>
                    )}
                    {!encounter ? (
                      <div />
                    ) : (
                      <div className="grid">
                        <div className="flex gap-4 justify-center">
                          <h2 className="text-center text-3xl font-bold m-4">
                            {encounter.encounter_name}
                          </h2>
                          <button
                            className="bg-defaultButton w-[280px] h-[50px] rounded-md hover:bg-gray-500 self-center"
                            id="delete"
                            onClick={(e) => handleDeleteEncounter(encounter.id)}
                          >
                            Delete Encounter
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 p-2 gap-2">
                          {encounter.encounter.map((monster, index) => (
                            <MonsterCard
                              monsters={monster}
                              key={index}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {toggledButtonId === "campaign" && (
                <div className="flex gap-4 justify-center">
                  Saving campaign&apos;s is a feature that is coming soon!
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
