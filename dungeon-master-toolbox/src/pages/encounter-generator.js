import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { InfinitySpin } from 'react-loader-spinner'
import MonsterCard from '../components/random-encounter/monster-cards.js';
import { useUser, useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import toast, { Toaster } from 'react-hot-toast';


export default function EncounterPage(props) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [challengeRating, setChallengeRating] = useState(1);
  const [allMonsters, setAllMonsters] = useState([]); 
  const [monsters, setMonsters] = useState([]);
  const [selectedMonsters, setSelectedMonsters] = useState([]);
  const [showMonsterData, setShowMonsterData] = useState(false);
  const [monsterStats, setMonsterStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [encounterName, setEncounterName] = useState('');

  const fetchAllMonsters = async (url, fetchedMonsters = new Set()) => {    
    try {
      const response = await axios.get(url);
      const { results, next } = response.data; 

      results.forEach((monster) => {
        fetchedMonsters.add(monster);
      });

      if (next) {
        setLoading(true);
        return fetchAllMonsters(next, fetchedMonsters);
      } else {
        setLoading(false);
        return Array.from(fetchedMonsters);
      }  
    } catch (error) {
      console.error('Error fetching monsters:', error.message);
    }
  };

  const fetchMonsters = async () => {
    const url = `https://api.open5e.com/monsters?cr=${challengeRating}`;
    const newFetchedMonsters = await fetchAllMonsters(url);

    const updatedAllMonsters = [
      ...allMonsters,
      ...newFetchedMonsters
    ];
    setAllMonsters(updatedAllMonsters);

    const uniqueMonsterNames = newFetchedMonsters
    setMonsters(uniqueMonsterNames);
  };
  
  const handleMonsterStats = () => {
    const stats = selectedMonsters.reduce((acc, name) => {
      const monster = allMonsters.find((monster) => {
        return monster.name === name;
      });
      
      if(monster) {
        acc.push(monster);
      }
      return acc;
    }, []);

    setMonsterStats(stats);
  };

  const addMonster = (monsterName) => {
    setSelectedMonsters([...selectedMonsters, monsterName]);
  };
  
  const removeMonster = (indexToRemove) => {
    setSelectedMonsters(selectedMonsters.filter((_, index) => index !== indexToRemove));
  };

  const toggleMonsterData = (index) => {
    setShowMonsterData(!showMonsterData);
    handleMonsterStats();
  };

  const handleResetSelectedMonsters = () => {
    setSelectedMonsters([]);
    setMonsters([]);
    setAllMonsters([]);
  };

  const handleSavingEncounter = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('monster_encounters')
      .insert({user_id: user.id, encounter_name: encounterName, encounter: monsterStats})

    if (error) {
      console.error('Error saving encounter:', error.message);
    }
  }

  return (
    <div className="min-h-screen max-w-7xl place-self-center">
      <div className="grid justify-items-center md:grid-cols-2 my-4 md:mt-10 md:space-x-4">
        <div className="space-y-4 p-4 max-w-[572px]">
          <h1 className="md:text-3xl text-4xl leading-none tracking-normal text-center sm:text-left font-[dmt]">
            Quick Build an Encounter
          </h1>
          <p>
            This tool allows you to quickly build an encounter by selecting the monster&apos;s challenge rating and then selecting monsters from the list. After you&apos;ve selected your monsters, you can view their stats and then reset the list to start over.
          </p>
          <div className="hidden md:grid grid-col-2 space-x-8 space-y-8">
            <div className='flex space-x-8'>
              <div className="flex">
                <p>
                  Combat Rating 
                </p>
                <input
                  type="number"
                  value={challengeRating}
                  onChange={(e) => setChallengeRating(e.target.value)}
                  placeholder="1"
                  className="w-10 pl-1 mx-3 bg-white text-black rounded-md"
                  required
                />
              </div>
              <button 
                className="px-2 w-1/2 h-8 border bg-defaultButton rounded-md hover:bg-gray-500" 
                onClick={fetchMonsters}
              >
                Fetch Monsters
              </button>
            </div>
            <div className="flex justify-between">
              <button className="px-2 border bg-defaultButton rounded-md hover:bg-gray-500" onClick={toggleMonsterData}>{
                showMonsterData ? 'Hide Monster Stats' : 'Show Monster Stats'}
              </button>
              <button className="px-2 border bg-defaultButton rounded-md hover:bg-gray-500" onClick={handleResetSelectedMonsters}>Reset Selected Monsters</button>
            </div>
          </div>
        </div>
        <div className="flex max-w-[572px] justify-items-center p-2">
          <Image 
            src="/images/tool-page-images/encounter.png" 
            alt="home page image" 
            width={722}
            height={432}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="md:hidden grid grid-col-1 space-x-4 space-y-4 mb-8">
        <div className='flex space-x-4 p-4'>
          <div className="flex">
            <p>
              Combat Rating 
            </p>
            <input
              type="number"
              value={challengeRating}
              onChange={(e) => setChallengeRating(e.target.value)}
              placeholder="CR"
              className="w-10 pl-1 mx-3 bg-white text-black rounded-md"
            />
          </div>
          <button className="px-2 w-1/2 h-8 border bg-defaultButton rounded-md hover:bg-gray-500" onClick={fetchMonsters}>Fetch Monsters</button>
        </div>
        <div className="flex justify-between pr-4">
          <button className="px-2 border bg-defaultButton rounded-md hover:bg-gray-500" onClick={toggleMonsterData}>{
            showMonsterData ? 'Hide Monster Stats' : 'Show Monster Stats'}
          </button>
          <button className="px-2 border bg-defaultButton rounded-md hover:bg-gray-500" onClick={handleResetSelectedMonsters}>Reset Selected Monsters</button>
        </div>
      </div>

      

      {!showMonsterData && (
        <>
          <div className="grid grid-cols-3">
            <div className='col-span-2'>
              <h3 className="text-center text-2xl font-bold">Monsters</h3>
              {loading ? (
                <div className="grid justify-items-center">
                  <InfinitySpin 
                    width='200'
                    color="#00008B"
                  />
                </div>
              ) : (
                <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {monsters.map((monsterName, index) => (
                  <li key={index} className="hover:bg-gray-500 bg-defaultButton rounded-md h-[64px] m-2 p-2 text-center" onClick={() => addMonster(monsterName.name)}>
                    {monsterName.name}
                  </li>
                ))}
              </ul>
              )}             
            </div>
            <div className='col-start-3'>
              <h3 className="text-center text-2xl font-bold">Selected Monsters</h3>
              <ul className="space-y-2">
                {selectedMonsters.map((monsterName, index) => (
                  <li key={index} className='text-sm text-center bg-defaultButton rounded-md mt-2 hover:bg-gray-500' onClick={() => removeMonster(index)}>{monsterName}</li>
                ))}
              </ul>
            </div>
          </div> 
        </>
      )}

      {showMonsterData && (
        <div className="p-2 space-y-2">
          <div className="grid gap-4">
            <h3 className="text-center text-4xl font-bold">Monster Data</h3>
            <div className="flex justify-center gap-4">
              <input 
                onChange={(e) => setEncounterName(e.target.value)}
                placeholder="Name your encounter" 
                className="border rounded-md p-2 text-lg w-64 text-white bg-gray-700"/>
              <button
                onClick={(e) => {handleSavingEncounter(e), toast.success('Encounter Saved!')}}
                className="bg-defaultButton w-[190px] h-[50px] rounded-md hover:bg-gray-500 place-self-center"
              >
                Save Encounter
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 p-2 gap-2">
          {monsterStats.map((monster, index) => (
            <MonsterCard monsters={monster} key={index} />
          ))}
          </div>
        </div>
      )}
    </div>
  )
}