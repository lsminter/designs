import '../styles/globals.css'
import NavBar from '../components/random-components/NavBar.js'
import LoginBanner from '../components/random-components/LoginBanner.js'
import Footer from '../components/random-components/Footer.js'
import {useState} from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Analytics } from '@vercel/analytics/react';
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Provider from '../../context/user.js'
import { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
    <Toaster />
      <Provider>
        <div className="grid min-h-screen bg-site-background bg-opacity-80 text-defaultText">
          <QueryClientProvider client={queryClient}>
            <NavBar />
            <LoginBanner className=""/>
            <Component {...pageProps} />
            <Footer />
          </QueryClientProvider>
          <Analytics />
        </div>
      </Provider>
    </SessionContextProvider>
  )
}
