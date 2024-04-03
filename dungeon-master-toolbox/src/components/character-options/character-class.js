import axios from 'axios'
import {
  useQuery,
} from "react-query";

function CharacterClass({ selectedCharacterClass }) {

  const useClass = () => {
    return useQuery("class", async () => {
      const { data } = await axios.get(
        'https://www.dnd5eapi.co/api/classes/'
      )
      return data;
    });
  }

  const { status, data, error, isFetching } = useClass();

  return (
    <div className="relative inline-block text-left px-2">
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
            <p className="text-center">Select Class</p>
            <select
              className="px-4 py-2 bg-defaultButton rounded-lg w-full"
              id="class"
              onChange={selectedCharacterClass}
            >
              {data.results.map((option) => {
                return(
                  <option 
                    className="text-center"
                    key={option.name}
                  >
                    {option.name}
                  </option>
                )
              })}
              </select>
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>  
    </div>
  );
}

export default CharacterClass;
