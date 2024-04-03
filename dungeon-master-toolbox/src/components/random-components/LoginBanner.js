import Link from 'next/link';
import { useUser } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'

const LoginBanner = () => {
  const user = useUser();
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setLoading(false)
  }, [])

  if(user){
    return null
  } else {
    return (
      <header className="max-w-sm justify-self-center">
        {!loading && (
          <Link href={user ? "/logout" : "/login"}>
            <p className="text-center font-bold text-xl mb-4 sm:mb-0 hover:text-[#00554B] sm:place-self-center">
              {user ? "Login or Create a free account!" : "Login or Create a free account!"}
            </p>
        </Link>
        )}
      </header>
    );
  }
};

export default LoginBanner;