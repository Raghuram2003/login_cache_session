// import { useState } from 'react'
import axios from "axios"
import Routes from "./components/Routes"
import UserContextProvider from "./components/UserContext"

function App() {
  axios.defaults.baseURL = 'http://127.0.0.1:8000/'
  axios.defaults.withCredentials = true
  return(
    <UserContextProvider>
      <Routes/>
    </UserContextProvider>
  )
}

export default App
