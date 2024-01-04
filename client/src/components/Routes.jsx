import { useContext } from "react";
import { UserContext } from "./UserContext";
import Home from "./Home";
import LoginAndRegister from "./LoginAndRegister";
// import { BrowserRouter as router,Route } from 'react-router-dom'

export default function Routes(){
    const {username} = useContext(UserContext)
    console.log(username)
    if(username){
        return(
            <Home/>    
        )
    }
    return(
        <LoginAndRegister/>
    )
}       