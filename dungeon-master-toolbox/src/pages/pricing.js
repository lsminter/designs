import initStripe from 'stripe'
import {useState, useEffect} from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js'
import Link from 'next/link';

const Pricing = ({plans}) => {
  const [userData, setUserData] = useState('defined')
  const [loading, setLoading] = useState(true)
  const user = useUser()
  const supabase = useSupabaseClient()

  useEffect(() => {
    const fetchData = async () => {

      if(user){
        const { data: profile, error } = await supabase
          .from('profile')
          .select(('*'))
          .eq('id', user.id)
          .single()

        setUserData({
          ...user,
          ...profile
        })
        setLoading(false)
      }
    }
    fetchData().then(() => setLoading(false))
    
  }, [supabase, user])

  const processSubscription = (planId) => async () => {
    const { data } = await axios.get(`/api/subscription/${planId}`);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  const login = async () => {
    supabase.auth.signInWithOAuth({
      provider: ['google'],
      options: {
        redirectTo: `${process.env.CLIENT_URL}/profile`
      }
    })
  }
  
  const showCreateAccountButton = !user;
  const showSubscribeButton = !!user && !userData.is_subscribed
  const showManageSubscriptionButton = !!user && userData.is_subscribed;

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-3xl mx-auto py-16 flex justify-center space-x-4">
        {plans.map((plan) => (
          <div key={plan.id}>
            {plan.active === false ? 
              <div /> :
                <div className="w-60 h-30 rounded shadow border-2 border-black bg-defaultButton hover:bg-gray-400 px-6 py-4">
                  <h2 className="text-xl">{plan.name}</h2>
                  <p className="text-gray-500">
                    ${plan.price / 100} / {plan.interval}
                  </p>
                  {!loading && (
                    <div>
                      {showCreateAccountButton && <button onClick={login}>Create Account</button>}
                      {showSubscribeButton && <button onClick={processSubscription(plan.id)}>Subscribe</button>}
                      {showManageSubscriptionButton && <Link href="/profile">Manage Subscription</Link>}
                    </div>
                  )}
                </div>
              } 
          </div>
        ))}
      </div>
    </div>
  )
};

export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY)

  const { data: prices } = await stripe.prices.list()

  const plans = await Promise.all(prices.map(async (price) => {
    const product = await stripe.products.retrieve(price.product)
    return {
      id: price.id,
      name: product.name,
      price: price.unit_amount,
      interval: price.recurring.interval,
      currency: price.currency,
      active: product.active
    }
  }))

  const sortedPlans = plans.sort((a, b) => a.price - b.price);

  return {
    props: {
      plans: sortedPlans,
    }
  }
}

export default Pricing;