import React, { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from './Components/Icons/navitlogo.png'
import Start from "./Components/Start";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory } from "react-router-dom";


function Login() {
  const navigate = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const signOut = () => {
    localStorage.setItem("logged","logged out");
    localStorage.setItem("loggedIn", "");
  
    setIsLoggedIn(false);

    logout(auth);
    console.log("out",localStorage.getItem("loggedIn"))
  };
  useEffect( () => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (error) {
      return console.log(error);
    }
    if (user) {
      console.log(user);
      localStorage.setItem("username",user.displayName);
      localStorage.setItem("usermail",user.email);
      localStorage.setItem("userimg", user.photoURL)
      localStorage.setItem("logged","logged in");
      localStorage.setItem("loggedIn", 1)

      setIsLoggedIn(true)
      // navigate.push("/");
    };
  }, [user, loading]);
  return (
  
    <div id="login" 
    className="flex ">
       
       
        <div className=" h-full w-full  -bottom-20bg-red-100 container flex-col mt-8 mx-8 p-8">
        <img 
        className="w-3/4 ml-10"
        src={logo}/>
       
        { isLoggedIn ?
        <div
         className="container mt-4 ml-16 bg-white p-4 
        lg:order-2 flex-col justify-center ">
         
            <br/>
            <img src={user.photoURL}
            className="w-24 h-24 rounded-full"
            />
             <h1
          className="text-l text-black font-bold mt-4">
            logged in as:
            <br/>
        {user.displayName} <br/>
        {user.email}

        </h1>
        <button 
        className="text-white bg-rose-600

        text-2xl  font-bold py-3 px-5 rounded-full mt-4 "
        onClick={signOut}>Log out</button> </div> : 
        <div>
           <button className="text-white bg-rose-600

            text-2xl  font-bold py-3 px-5 rounded-full mt-8 items-stretch
            mr-2 mb-2 "
            onClick={signInWithGoogle}>
            <h1> Login with Google</h1>
            </button>
        </div>
        }
      </div>
      
      
    </div>
  );
}
export default Login;