import CharacterAlignment from "../components/character-options/character-alignment.js";
import CharacterClass from "../components/character-options/character-class.js";
import CharacterRace from "../components/character-options/character-race.js";
import CharacterSex from "../components/character-options/character-sex.js";
import AdditionalInfo from "../components/character-options/additional-info.js";
import FullCharacterSheet from "../components/character-sheet/fullCharacterSheet.js";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Configuration, OpenAIApi } from "openai";
import { InfinitySpin } from "react-loader-spinner";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function AllCharacterOptions() {
  const supabase = useSupabaseClient();

  const [race, setRace] = useState("Dragonborn");
  const [characterClass, setCharacterClass] = useState("Barbarian");
  const [alignment, setAlignment] = useState("Chaotic Evil");
  const [sex, setSex] = useState("Male");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [imageSpinner, setImageSpinner] = useState(false);
  const [image, setImage] = useState(undefined);
  const [characterDescription, setCharacterDescription] = useState("");
  const [characterBackground, setCharacterBackground] = useState("");
  const [characterName, setCharacterName] = useState("");
  const ref = useRef(null);

  const handleSelectedRace = () => {
    const selectedRace = document?.getElementById("race")?.value;
    console.log(selectedRace);
    setRace(selectedRace);
  };

  const handleAlignment = () => {
    const selectedAlignment = document?.getElementById("alignment")?.value;
    console.log(selectedAlignment);
    setAlignment(selectedAlignment);
  };

  const handleCharacterClass = () => {
    const selectedClass = document?.getElementById("class")?.value;
    console.log(selectedClass)
    setCharacterClass(selectedClass);
  };

  const handleCharacterSex = () => {
    const selectedSex = document?.getElementById("sex")?.value;
    console.log(selectedSex);
    setSex(selectedSex);
  };

  const handleAdditionalInfo = () => {
    const selectedAdditionalInfo = document?.getElementById("info")?.value;
    console.log(selectedAdditionalInfo);
    setAdditionalInfo(selectedAdditionalInfo);
  };

  const allOptions = `The race is ${race}, the class of the character is ${characterClass}, they are ${sex}, and the alignment is ${alignment}. This is the additional info: ${additionalInfo}.`;

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_AI_TOKEN,
  });

  const openai = new OpenAIApi(configuration);

  const fetchAIResponse = async () => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `
            I need you to create three sections Name, Description, and Background based on these options: ${allOptions}. For the name, I need a first and last name. For the Description, I need a detailed character description, 100 characters max with skin color, eye color, sex, with no filler words. For the background, write a short background for a 5E DND character.
            
            Output it like this:
            Name: First Last
            Description: Description
            Background: Background`,
        },
      ],
    });
    setAiResponse(() => {
      return completion.data.choices[0].message.content;
    });
  };

  const inputString = aiResponse;

  const outputArray = inputString.split("\n").filter(Boolean);

  const outputObject = {};

  for (let item of outputArray) {
    const [key, value] = item.split(":").map((item) => item.trim());
    outputObject[key] = value;
  }

  const name = Object.keys(outputObject)[0];
  const description = Object.keys(outputObject)[1];
  const background = Object.keys(outputObject)[2];

  const nameValue = outputObject[name];
  const descriptionValue = outputObject[description];
  const backgroundValue = outputObject[background];

  useEffect(() => {
    setCharacterName(nameValue)
    setCharacterDescription(descriptionValue);
    console.log({useEffect: characterDescription})
    setCharacterBackground(backgroundValue);
  }, [descriptionValue, backgroundValue, nameValue, characterDescription]);

  const fetchImageResponse = async () => {
    console.log({function: characterDescription})
    const reply = await openai.createImage({
      prompt: `${characterDescription}. by Boris Vallejo, full body, concept art, hyper-representational art on paperback, octane render, light rendering, VFX simulation`,
      n: 1,
      size: "256x256",
      response_format: "b64_json"
    });
    setImage(() => {
      return reply.data.data[0].b64_json;
    });
  };

  const handleAllOptions = (e) => {
    e.preventDefault();
    setSpinner(true);
    fetchAIResponse()
      .then((data) => {
        setImageSpinner(true);
        setSpinner(false);
        fetchImageResponse().then(() => {
          setImageSpinner(false);
        })
      })
  };

  const b64Image = `data:image/png;base64,${image}`
  const characterImage = !image ? "/images/tool-page-images/pc.png" : b64Image;
  
  return (
    <div className="min-h-screen mt-4 text-defaultColor max-w-7xl place-self-center">
      <div className="grid justify-items-center md:grid-cols-2 mt-4 md:mt-10 md:space-x-4">
        <div className="space-y-4 p-4 max-w-[572px]">
          <h1 className="md:text-3xl text-4xl leading-none tracking-normal text-center sm:text-left font-[dmt]">
            Quickly build your own Player Character
          </h1>
          <p>
            Select a few options and the AI will create a name, description, and
            background for your PC.
          </p>
          <form
            className="hidden md:grid space-y-4"
            id="allValues"
            onSubmit={handleAllOptions}
          >
            <div className="grid grid-cols-2 content-center">
              <CharacterRace
                className="m-2"
                selectedRace={() => handleSelectedRace()}
              />
              <CharacterAlignment
                className="m-2"
                selectedAlignment={() => handleAlignment()}
              />
              <CharacterClass
                className="m-2"
                selectedCharacterClass={() => handleCharacterClass()}
              />
              <CharacterSex
                className="m-2"
                selectedSex={() => handleCharacterSex()}
              />
            </div>
            <AdditionalInfo
              className="m-2"
              selectedAdditionalInfo={() => handleAdditionalInfo()}
            />
            <button
              className="px-2 py-2 mx-2 bg-defaultButton rounded-lg hover:bg-gray-500"
              type="submit"
            >
              Create Character!
            </button>
          </form>
        </div>
        <div className="flex max-w-[572px] justify-items-center p-2">
          <Image
            src="/images/tool-page-images/pc.png"
            alt="home page image"
            width={722}
            height={432}
            className="rounded-md"
          />
        </div>
      </div>
      <form
        className="md:hidden space-y-4"
        id="allValues"
        onSubmit={handleAllOptions}
      >
        <div className="grid grid-cols-1 content-center">
          <CharacterRace
            className="m-2"
            selectedRace={() => handleSelectedRace()}
          />
          <CharacterAlignment
            className="m-2"
            selectedAlignment={() => handleAlignment()}
          />
          <CharacterClass
            className="m-2"
            selectedCharacterClass={() => handleCharacterClass()}
          />
          <CharacterSex
            className="m-2"
            selectedSex={() => handleCharacterSex()}
          />
          <AdditionalInfo
            className="m-2"
            selectedAdditionalInfo={() => handleAdditionalInfo()}
          />
        </div>
        <button
          className="px-2 py-2 mx-2 bg-defaultButton rounded-lg hover:bg-gray-500"
          type="submit"
        >
          Create Character!
        </button>
      </form>
      <div>
        {spinner === true ? (
          <div className="grid place-items-center">
            <InfinitySpin
              width="200"
              color="#00008B"
            />
          </div>
        ) : (
          <form
            ref={ref}
            className="mt-8"
          >
            <div className="grid grid-cols-1 md:flex justify-center space-x-4">
              <h2
                name="characterName"
                className="text-center text-3xl bg-inherit"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
              >
                {characterName}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
              {imageSpinner === true ? (
                <div className="grid place-items-center">
                  <InfinitySpin
                    width="200"
                    color="#00008B"
                  />
                </div>
              ) : (
                <div className="flex place-self-center p-2">
                  <Image
                    src={characterImage}
                    alt="DALL-E image of dnd character"
                    name="characterImage"
                    width={400}
                    height={400}
                    className="border-2 border-black rounded-md w-full"
                  />
                </div>
              )}
              <div className="grid grid-col-1 space-y-4 p-2 place-self-start w-full">
                <div>
                  <h1 className="font-bold text-xl">{description}</h1>
                  {!descriptionValue ? (
                    <p className="hidden" />
                  ) : (
                    <textarea
                      name="characterDescription"
                      value={characterDescription}
                      onChange={(e) => setCharacterDescription(e.target.value)}
                      className="bg-inherit w-full"
                    />
                  )}
                </div>
                <div>
                  <h1 className="font-bold text-xl">{background}</h1>
                  {!backgroundValue ? (
                    <p className="hidden" />
                  ) : (
                    <textarea
                      name="characterBackground"
                      value={characterBackground}
                      onChange={(e) => setCharacterBackground(e.target.value)}
                      className="bg-inherit w-full"
                    />
                  )}
                </div>
              </div>
            </div>
          </form>
        )}        

      </div>
      {!image ? (
        <div />
      ) : (
        <FullCharacterSheet
          nameValue={characterName}
          background={characterBackground}
          description={characterDescription}
          characterClass={characterClass}
          race={race}
          alignment={alignment}
          b64={image}
        />
      )}
    </div>
  );
}
