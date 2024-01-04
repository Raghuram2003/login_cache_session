import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios"
import cookie from "react-cookies";

export default function LoginAndRegister() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginOrRegister, setLoginOrRegister] = useState("register");
    const { setUsername: setLoggedInUsername, setUserId } = useContext(UserContext);
    async function handleSubmit(ev){
        ev.preventDefault();
        const response =await axios.post("/api/"+loginOrRegister+"/",{username,password})
        console.log(response)
        setLoggedInUsername(response.data.username)
        setUserId(response.data.id)
        cookie.save('token',response.data.token,{path:"/"})
    } 
  return (
    <div className="flex h-screen items-center bg-blue-200">
      <form className="mx-auto" onSubmit={handleSubmit}>
        <div className="block text-center p-2 text-lg w-full text-grey-200">
          {loginOrRegister[0].toUpperCase() + loginOrRegister.slice(1)}
        </div>
        <input
          type="text"
          placeholder="Username"
          className="p-2 text-center block mb-2"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          className="p-2 text-center block mb-2"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>
        <button
          type="submit"
          className="bg-blue-500 w-full text-white block rounded-sm p-2"
        >
          {loginOrRegister[0].toUpperCase() + loginOrRegister.slice(1)}
        </button>
        {loginOrRegister === "login" && (
          <div className="text-center mt-2">
            Not a member,{" "}
            <button onClick={() => setLoginOrRegister("register")}>
              Register
            </button>
          </div>
        )}
        {loginOrRegister === "register" && (
          <div className="text-center mt-2">
            Already a member,{" "}
            <button onClick={() => setLoginOrRegister("login")}>Login</button>
          </div>
        )}
      </form>
    </div>
  );
}
