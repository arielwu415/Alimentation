import '../styles/globals.css'
import Head from 'next/head'
import ContextProvider from '../components/state/ContextProvider'

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || (page => page)

  return (
    <>
    <Head>
      <title>Alimentation</title>
    </Head>
    
    <ContextProvider>
      {getLayout(<Component {...pageProps} />)}
    </ContextProvider>
    </>
  )
}

export default MyApp
