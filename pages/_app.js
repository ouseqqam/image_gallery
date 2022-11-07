import '../styles/globals.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
//high order component;
import router from 'next/router'


function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />

  )
}

export default MyApp