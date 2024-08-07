
import { useEffect, useState } from 'react'
import {Provider, useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'
import {Header,Footer} from './components/index'
import { Router } from 'react-router-dom'

function App() {
  // console.log(process.env.VITE_APPWRITE_URL) 
  // console.log(import.meta.env.VITE_APPWRITE_URL)

  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((data)=>{
      if(data){
        dispatch(login({data}))
      }else{
        dispatch(logout())
      }
  })
    .finally(() => {setLoading(false)})
  } , [])

  return loading ? (<h1>Loading....</h1>) : (
    <Provider>
    <div className='bg-gray-400 min-h-screen mx-20 my-20'>
      <div className=''>
        <Header />
        <main>
         TODO :  {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
    </Provider>
    
  )
}

export default App
