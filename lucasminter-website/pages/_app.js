import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Footer from '../components/footer'
import Header from '../components/header'
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <div className='h-full px-4 sm:px-12 bg-background'>
      <Header />
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZXP421LJ7Y" />
      <Component {...pageProps} />
      <Footer />
      <Analytics />
    </div>
  )
}

export default MyApp
