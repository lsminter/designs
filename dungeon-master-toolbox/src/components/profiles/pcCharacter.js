import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react' 
import { useQuery } from "react-query";

const SavedPCs = ({subscribed}) => {
  const supabase = useSupabaseClient()
  const user = useUser()

  const usePCs = () => {
    return useQuery('savedPCs', async () => {
      const data = await supabase
        .from('pc_characters')
        .select('pc_name')
        .eq('id', user.id)


      return data.data.map((pc) => pc.pc_name)
    })
  }

  const { status, data, error, isFetching } = usePCs();

  return (
    <div className="relative inline-block text-center px-2">
      <p className="text-center">Saved PC&apos;s</p>
      <p> You cannot save pc&apos;s yet, but you will be able to in the future!</p>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        subscribed ?
          <div>
            {data.map((name, index) => {
              return(
                <p key={index}>PC: {name}</p>
              )
            })}
          </div> 
        : 
          <div>
            <p>Subscribe to see more than two of your saved PC&apos;s!</p>
            <div>
              {data.slice(0, 2).map((name, index)  => {
                return(
                  <p key={index}>PC: {name}</p>
                )
              })}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default SavedPCs;