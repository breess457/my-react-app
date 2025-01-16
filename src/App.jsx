import { useState,useEffect,createContext } from 'react'
import Home from './pages/Home'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import InPage from './pages/InPage'

export const GetContect = createContext()

function App() {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')))
  const [profileData, setProfileData] = useState({})
  const fetchProfileData = async (isToken)=>{
    try{
      const fetch_data = await fetch('http://localhost:3001/api/profile',{
        method:"GET",
        headers:{
          "x-access-token":isToken,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      const result = await fetch_data.json()
      console.log(result.data)
      setProfileData(result.data)
    }catch(e){
      sessionStorage.removeItem('token')
      setToken(null)
      console.log(e)
    }
  }
  useEffect(()=>{
     if(token){
       fetchProfileData(token)
     }
  },[])
  console.log({token:token})
  return (
    <GetContect.Provider value={{token,profileData}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/in/page'element={<InPage />}/>
        </Routes>
      </BrowserRouter>
    </GetContect.Provider>
  )
}

export default App
