import {useRouter} from 'next/router';
import {useEffect} from 'react';
import Link from 'next/link';

const Success = () => {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/profile')
    }, 5000);
    timeout;
  }, [router]);


  return (
    <div className="min-h-screen">
      <h1>Payment Success</h1>
      <h3>You will be redirected to your profile in 5 seconds.</h3>
      <h3>Click <Link href="/profile">HERE</Link> to be redirected to your profile.</h3>
    </div>
  )
}

export default Success;