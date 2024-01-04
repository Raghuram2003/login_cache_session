import axios from "axios";
import { createContext,  useEffect,  useState } from "react";
import Cookies from "js-cookie";
export const UserContext = createContext({})

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({children}){
    const [username,setUsername] = useState(null)
    const [userId,setUserId] = useState(null)
    const values = {
        username,
        setUsername,
        userId,
        setUserId
    }
    useEffect(()=>{
        const token = Cookies.get('token')?.toString();
        axios.post("/api/time_delta/",{token}).then(response=>{
            console.log(response)
            setUsername(response.data.username)
            setUserId(response.data.userId)
        })
    },[])
    return(
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>    
    )
}