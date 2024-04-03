import CharacterAlignment from './character-alignment.js'
import CharacterClass from './character-class.js'
import CharacterRace from './character-race.js'
import CharacterSex from './character-sex.js'
import AdditionalInfo from './additional-info.js'
import FullCharacterSheet from '../character-sheet/fullCharacterSheet.js'
import { useState } from 'react';
import Image from 'next/image'
import { Configuration, OpenAIApi } from 'openai';
import { InfinitySpin } from 'react-loader-spinner'

export default function AllCharacterOptions() {
  const [race, setRace] = useState("Dragonborn")
  const [characterClass, setCharacterClass] = useState("Barbarian")
  const [alignment, setAlignment] = useState("Chaotic Evil")
  const [sex, setSex] = useState("Male")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [spinner, setSpinner] = useState(false)
  const [imageSpinner, setImageSpinner] = useState(false)
  const [image, setImage] = useState(undefined);

  const handleSelectedRace = () => {
    const selectedRace = document?.getElementById("race")?.value;
    setRace(selectedRace)
  }
  
  const handleAlignment = () => {
    const selectedAlignment = document?.getElementById("alignment")?.value;
    setAlignment(selectedAlignment)
  }
  
  const handleCharacterClass = () => {
    const selectedClass = document?.getElementById("class")?.value;
    setCharacterClass(selectedClass)
  }
  
  const handleCharacterSex = () => {
    const selectedSex = document?.getElementById("sex")?.value;
    setSex(selectedSex)
  }
  
  const handleAdditionalInfo = () => {
    const selectedAdditionalInfo = document?.getElementById("info")?.value;
    setAdditionalInfo(selectedAdditionalInfo)
  }

  const allOptions = `The race is ${race}, the class of the character is ${characterClass}, they are ${sex}, and the alignment is ${alignment}. This is the additional info: ${additionalInfo}.`

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_AI_TOKEN,
  });

  const openai = new OpenAIApi(configuration);

  const fetchAIResponse = async () => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `
      I need you to create three sections Name, Description, and Background based on these options: ${allOptions}. For the name, I need a first and last name. For the Description, I need a very short, 100 characters max, character description with no filler words but add scales color, eye color, and height. For the background, write a short background for a 5E DND character.
      
      Output it like this:
      Name: First Last
      Description: Description
      Background: Background`}],
    });
    setAiResponse(() => {
      return completion.data.choices[0].message.content;
    })
  }

  const inputString = aiResponse;

  const outputArray = inputString.split('\n').filter(Boolean); 

  const outputObject = {};

  for (let item of outputArray) {
    const [key, value] = item.split(':').map((item) => item.trim()); 
    outputObject[key] = value; 
  }

  const name = Object.keys(outputObject)[0]
  const description = Object.keys(outputObject)[1]
  const background = Object.keys(outputObject)[2]

  const nameValue = outputObject[name];
  const descriptionValue = outputObject[description];
  const backgroundValue = outputObject[background];
  
  const fetchImageResponse = async () => {
    setImage();
    const reply = await openai.createImage({
      prompt: `Head only facing camera, D&D Classic Style, 4k, ${sex}, ${race}, ${descriptionValue}.`,
      n: 1,
      size: "256x256",
    })
    setImage(() => {
      return reply.data.data[0].url
    })
  }
  
  const handleAllOptions = (e) => {
    e.preventDefault();
    setSpinner(true);
    fetchAIResponse()
    .then((data) => {
      setSpinner(false);
     })
    .then(() => {
      setImageSpinner(true)
    })
    .then(() => {
      fetchImageResponse();
    })
    .then(() => {
      setImageSpinner(false)
    })
  }
  
  return (
    <div className="mt-2">
      <form 
        className="space-y-4"
        id="allValues" 
        onSubmit={handleAllOptions}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 content-center text-defaultText">
          <CharacterRace className="m-2" selectedRace={() => handleSelectedRace()}/>
          <CharacterAlignment className="m-2" selectedAlignment={() => handleAlignment()}/>
          <CharacterClass className="m-2" selectedCharacterClass={() => handleCharacterClass()}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 content-center text-defaultText">
          <CharacterSex className="m-2" selectedSex={() => handleCharacterSex()}/>
          <AdditionalInfo className="m-2 text-defaultText" selectedAdditionalInfo={() => handleAdditionalInfo()}/>
        </div>
        <button className="px-2 py-2 mx-2 bg-defaultButton text-defaultText rounded-lg hover:bg-gray-500" type="submit">Get Character!</button>
      </form>
      <div>
      {spinner === true ? (
        <InfinitySpin 
          width='200'
          color="#00008B"
        />
        ) : 
        <div className="sm:flex mt-2">
          {imageSpinner === true ? 
            <InfinitySpin 
              width='200'
              color="#00008B"
            />
          : 
            <Image 
              src={image || "/dnd-logo.png"}
              alt="DALL-E image of dnd character"
              width={250}
              height={250}
              className="border-2 border-black rounded-md"
            />
          }
          <div className="m-2 space-y-2 text-gray-200">
            <h1 className="font-bold">
              {name}
            </h1>
            <p>
              {nameValue}
            </p>
            <h1 className="font-bold">
              {description}
            </h1>
            <p>
              {descriptionValue}
            </p>
            <h1 className="font-bold">
              {background}
            </h1>
            <p>
              {backgroundValue}
            </p>
          </div>
        </div>
      }
      <FullCharacterSheet name={nameValue} background={backgroundValue} description={descriptionValue} characterClass={characterClass} race={race} alignment={alignment} />
      </div>
    </div>
  )
}