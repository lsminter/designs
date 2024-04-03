import {useEffect} from 'react'
import useRouter from 'next/router'

const Login = () => {
  const router = useRouter

  useEffect(() => {
    const login = () => {
      router.push("/profile")
    }
    login()
  })

  return <p>Logging In</p>
}

export default Login;