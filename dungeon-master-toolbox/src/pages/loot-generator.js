import {useState} from 'react';
import rollTable from '../components/loot-generator/loot-functions.js'
import Image from 'next/image'


export default function Home() {
  const [loot, setLoot] = useState("")

  const rollingTableLoot = () => {
    const selectedLootTable = document?.getElementById("lootTable")?.value;
    setLoot(rollTable(selectedLootTable))
  }

  const handleLoot = () => {
    setLoot("");
    rollingTableLoot();
  }

  const lootArray = loot.split(', ')
  
  // 0-4, 5-10, 11-16, >17

  return (
    <div className="min-h-screen max-w-7xl place-self-center">
      <div className="grid justify-items-center md:grid-cols-2 mt-4 md:mt-10 md:space-x-4">
        <div className="space-y-8 p-4 max-w-[572px]">
          <h1 className="md:text-3xl text-4xl leading-none tracking-normal text-center sm:text-left font-[dmt]">
          Quickly get loot for completing a quest
          </h1>
          <p>
            Select the challenge level of the quest and click the button to get loot.
          </p>
          <div className="hidden md:flex space-x-2 place-content-center">
            <p>
              Challenge Rating:
            </p>
            <div className="space-x-2">
              <select 
                id="lootTable"
                className="bg-defaultButton rounded-md">
                <option 
                  id='0-4'
                  key='0-4'
                  value='2'
                >
                  0-4
                </option>
                <option 
                  id='5-10'
                  key='5-10'
                  value='6'
                >
                  5-10
                </option>
                <option 
                  id='11-16'
                  key='11-16'
                  value='13'
                >
                  11-16
                </option>
                <option 
                  id='17+'
                  key='17+'
                  value='17'
                >
                  17+
                </option>
              </select>
              <button
                className="px-2 bg-defaultButton rounded-md" 
                onClick={handleLoot}
              >
                Roll Items
              </button>
            </div>
          </div>
        </div>
        <div className="max-h-[432px] justify-items-center p-2">
          <Image 
            src="/images/tool-page-images/loot.png" 
            alt="home page image" 
            width={722}
            height={432}
            className="rounded-md"
          />
        </div>
      </div>
      <div className="grid md:hidden text-center place-items-center">
        <div className="text-2xl">
          Treasure Hoard Challenge
        </div>
        <div className="flex space-x-2 place-content-center mt-4">
          <p>
            Challenge Rating:
          </p>
            <select 
              id="lootTable"
              className="ml-2 bg-defaultButton rounded-md">
              <option 
                id='0-4'
                key='0-4'
                value='2'
              >
                0-4
              </option>
              <option 
                id='5-10'
                key='5-10'
                value='6'
              >
                5-10
              </option>
              <option 
                id='11-16'
                key='11-16'
                value='13'
              >
                11-16
              </option>
              <option 
                id='17+'
                key='17+'
                value='17'
              >
                17+
              </option>
            </select>
          <button
            className="mx-2 px-2 bg-defaultButton rounded-md" 
            onClick={handleLoot}
          >
            Roll Items
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="bg-defaultButton w-96 text-center mt-4 rounded-md place-self-center">
          <div className="flex flex-col">
            {lootArray.map((item, i) => {
              return(
                <p key={i} className="text-lg text-defaultText pr-2">{item}</p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
