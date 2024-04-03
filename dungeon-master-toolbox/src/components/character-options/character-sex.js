import {useQuery} from "react-query";

function CharacterSex({ selectedSex }) {
  
  const useSex = () => {
    return useQuery ("sex", async () => {
      const sexes = [
        {"sex": "male"}, 
        {"sex": "female"}
      ]
      return sexes
    })
  }

  const { status, data, error, isFetching } = useSex();

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
              <p className="text-center">Select Appeared Sex</p>
              <select
                className="px-4 py-2 bg-defaultButton rounded-lg w-full"
                id='sex'
                onChange={selectedSex}
              >
                {data.map((option) => {
                  return(
                    <option 
                      className="text-center"
                      id={option.sex}
                      key={option.sex}
                      value={option.sex}
                    >
                      {option.sex}
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

export default CharacterSex;
