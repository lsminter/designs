import {useEffect} from 'react'
import { useRouter } from "next/router";
import {useUserContext} from '../../context/user'

const Logout = () => {
  const { supabase, logout } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const logoutFunction = async () => {
      logout()
    }
    logoutFunction()
  }, [logout])

  return <p>Logging out</p>
}

export default Logout;