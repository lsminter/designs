import axios from 'axios'
import {
  useQuery,
} from "react-query";

function CharacterRace({ selectedRace }) {
  
  const useRace = () => {
    return useQuery("races", async () => {
      const { data } = await axios.get(
        'https://www.dnd5eapi.co/api/races/'
      )
      return data;
    });
  }

  const { status, data, error, isFetching } = useRace();

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
            <p className="text-center">Select Race</p>
            <select
              className="px-4 py-2 bg-defaultButton rounded-lg"
              id='race'
              onChange={selectedRace}
            >
              {data.results.map((option) => {
                return(
                  <option 
                    id={option.name}
                    key={option.name}
                    value={option.name}
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

export default CharacterRace;
