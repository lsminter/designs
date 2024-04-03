import {useRouter} from 'next/router';
import {useEffect} from 'react';
import Link from 'next/link';

const Cancelled = () => {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/profile')
    }, 5000);
    timeout;
  }, [router]);

  return (
    <div className="min-h-screen">
      <h1>Payment cancelled. You have not been charged!</h1>
      <h3>You will be redirected to your profile in 5 seconds.</h3>
      <h3>If not, click <Link href="/profile">here</Link>.</h3>
    </div>
  )
}

export default Cancelled;