import '../styles/globals.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
//high order component;
import router from 'next/router'

const IsAuth  = ({children}) => {
  useEffect(() => {
    //check if user is logged in
    const token = localStorage.getItem('token')
    if(!token){
      router.push('/login')
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <IsAuth>
        <Component {...pageProps} />
      </IsAuth>
    </Provider>
  )
}

export default MyApp