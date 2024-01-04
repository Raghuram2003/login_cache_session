import { useContext } from "react"
import { UserContext } from "./UserContext"
import Cookies from "js-cookie";
import axios from "axios";

export default function Home(){
    const {username,userId,setUsername,setUserId} = useContext(UserContext)
    function logout(ev){
        ev.preventDefault();
        setUsername(null)
        setUserId(null)
        const token = Cookies.get('token')
        axios.get('/api/delete_cache',{token}).then(response=>console.log(response))
        Cookies.remove('token')
    }
    return(
        <div className="flex h-screen items-center bg-blue-200" >
            <div className="mx-auto">
                <div className="text-center -translate-x-1/4">Home, {username} your ID is {userId}</div>    
                <button onClick={logout} className="text-center bg-blue-300 rounded-md p-2">Logout</button>
            </div>
        </div>  
    )
}