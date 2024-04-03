import Image from 'next/image';
import ToolsCard from '../components/home-page-components/toolsCard.js';

export default function Home() {

  return (
    <div className="min-h-screen mx-[24px] text-defaultColor max-w-7xl place-self-center">
      <div className="grid justify-items-center md:grid-cols-2 mt-4 md:mt-10 md:space-x-4">
        <div className="space-y-4 p-4 max-w-[572px]">
          <h1 className="md:text-3xl text-4xl leading-none tracking-normal text-left font-[dmt]">
            Everything You Need as a Dungeon Master
          </h1>
          <p>
            Enhance your tabletop gaming with DMToolbox. Access powerful tools and resources to level up your campaigns. Join our community of passionate Dungeon Masters and players.
          </p>
        </div>
        <div className="flex max-w-[572px] justify-items-center">
          <Image 
            src="/images/home-page-images/home.png" 
            alt="home page image" 
            width={722}
            height={432}
            className="rounded-md"
          />
        </div>
      </div>
      <div 
        className="mt-8 gap-y-8 grid md:grid-cols-2 md:gap-x-8 justify-items-stretch"
      >
        <ToolsCard 
          image='/images/home-page-images/pc.png' 
          title="Character Generator" 
          description='The character generator is a tool that allows you to quickly build your own DND character! You select the Race, Alignment, Class, and Gender and it will generate a name, character description, and character background for you. It will also generate an image of your character, all using AI.'
          toolPage="/pc-generator"
        />
        <ToolsCard 
          image='/images/home-page-images/loot.png' 
          title="Loot Table Generator" 
          description='The Loot Generator will help you to create simple loot to make dungeon rewards easy for your DM&apos;s. It currently only rolls on the Treasure Hoard table, but I plan to add more tables in the future.'  
          toolPage="/loot-generator"
        />
        <ToolsCard 
          image='/images/home-page-images/npc.png' 
          title="NPC Generator" 
          description='The NPC Generator will help you to create simple NPCs to enhance your story. Select from a list of Race, Gender, and Job and it will generate a name, character description, and character background for you using AI.'  
          toolPage="/npc-generator"
        />
        <ToolsCard 
          image='/images/home-page-images/encounter.png' 
          title="Encounter Generator" 
          description='The Encounter Generator allows you to select monsters from a list of monsters based on Combat Rating. You can then select the amount of each monster you want, click the Selected Monster Stats button, and it will display the stats for each monster you selected.'  
          toolPage="/encounter-generator"
        />
      </div>
    </div>
  )
}
