import React, { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from './Components/Icons/navitlogo.png'
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user){
      return (
        <div>
          <p>Current User: {user.email}</p>
          <button onClick={logout}>Log out</button>
        </div>
      );
    };
  }, [user, loading]);
  return (
    <div id="login" 
    className="flex ">
      <div className=" h-full w-full  -bottom-20bg-red-100 container flex-col mt-72 mx-20 p-8">
        <img src={logo}/>
        <button class="text-white bg-rose-600

         text-2xl  font-bold py-3 px-5 rounded-full mt-8 items-stretch
         mr-2 mb-2 "
        onClick={signInWithGoogle}>
         <h1> Login with Google</h1>
        </button>
       
      </div>
    </div>
  );
}
export default Login;