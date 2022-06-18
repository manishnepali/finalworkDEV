import React, { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle, logout } from "../Backend/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from '../Components/Icons/navitlogo.png'
import Start from "./Start";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory } from "react-router-dom";
  import AddedByUser from "./AddedByUser";
  import LikedByUser from "./LikedByUser";


function Login() {
  const navigate = useHistory();
  const [seeAdded,setSeeAddded] = useState(false);
  const [seeLiked,setSeeLiked] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const signOut = () => {
    localStorage.setItem("logged","logged out");
    localStorage.setItem("loggedIn", "");
    setSeeAddded(false);
    setIsLoggedIn(false);

    logout(auth);
    console.log("out",localStorage.getItem("loggedIn"));
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
      localStorage.setItem("userId",user.id);
      localStorage.setItem("usermail",user.email);
      localStorage.setItem("userimg", user.photoURL)
      localStorage.setItem("logged","logged in");
      localStorage.setItem("loggedIn", 1)

      setIsLoggedIn(true)
      // navigate.push("/");
    };
  }, [user, loading]);

  function goToAdded(){
    if(seeAdded == false){setSeeAddded(true)}else{setSeeAddded(false);}
    
  }
  function goToLiked(){
    if(seeLiked == false){setSeeLiked(true)}else{setSeeLiked(false);}
    
  }
  return (
  
    <div id="login" 
    className="flex ">
       
       
        <div className=" h-full w-full  -bottom-20bg-red-100 container flex-col mt-12 p-20">
        <img 
        className="w-36 mx-8"
        src={logo}/>
       
        { isLoggedIn ?
        
        <div
        className='basis-0 grow p-6 text-center
        w-100
         md:text-left md:flex md:flex-col md:justify-center md:items-center'>
          
          
         <div
         className="w-full flex justify-around">
            <br/>
            <img src={user.photoURL}
            className="w-24 h-24 rounded-full"
            />
             <h1
          className="text-xl text-black font-bold align-baseline
          text-justify ml-4">
            logged in as:
            <br/>
        {user.displayName} <br/>
        {user.email}

        </h1>
        
       
       
        </div>
        <Link to="/explore">
        <button
        className="px-8 rounded-lg bg-red-600  
        text-white font-bold p-4  my-4  "
        >Let's start</button>
        </Link>
        <br/>
        <button 
        className="fixed top-0 right-0 px-8 mx-4 rounded-lg bg-red-600  
        text-white font-bold p-4  my-4  "
        onClick={signOut}>Log out</button> 
        {seeAdded?
        <div>
        <label for="added" class="inline-flex relative items-center cursor-pointer">
  <input 
   onClick={goToAdded}
  type="checkbox" value="" id="added" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 dark:peer-focus:ring-red-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-100 peer-checked:bg-red-600"/>
  <span class="ml-3 text-sm font-medium text-gray-200 dark:text-gray-300"> <h1
        className="font-bold  text-l text-black  w-full "
       >close added</h1></span>
</label>
        
        </div>:
        <div>
       
       
        <label for="added" class="inline-flex relative items-center cursor-pointer">
  <input 
   onClick={goToAdded}
  type="checkbox" value="" id="added" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 dark:peer-focus:ring-white rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-100 peer-checked:bg-red-600"/>
  <span class="ml-3 text-sm font-medium text-gray-200 dark:text-gray-300"> <h1
        className="font-bold  text-l text-black  w-full "
       >see added</h1></span>
</label>
        
        </div>}

        {seeLiked?
        <div>
             <label for="liked" class="inline-flex relative items-center cursor-pointer">
              <input 
              onClick={goToLiked}
              type="checkbox" value="" id="liked" class="sr-only peer"/>
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 dark:peer-focus:ring-red-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-100 peer-checked:bg-red-600"/>
              <span class="ml-3 text-sm font-medium text-gray-200 dark:text-gray-300"> <h1
                    className="font-bold  text-l text-black  w-full "
                  >close liked</h1></span>
            </label>
        </div>:
        <div>
           <label for="liked" class="inline-flex relative items-center cursor-pointer">
          <input 
          onClick={goToLiked}
          type="checkbox" value="" id="liked" class="sr-only peer"/>
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 dark:peer-focus:ring-red-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-100 peer-checked:bg-red-600"/>
          <span class="ml-3 text-sm font-medium text-gray-200 dark:text-gray-300"> <h1
                className="font-bold  text-l text-black  w-full "
              >see liked</h1></span>
        </label>
          </div>}
        
        
        
        
        </div> : 
        <div>
           <button className="flex justify-around px-8 rounded-lg bg-red-600  
          text-white font-bold p-4 mx-4  my-4"
            onClick={signInWithGoogle}>
            <h1> Login with Google</h1>
            </button>
            
        </div>
        }

{seeAdded?
        <div>
          <AddedByUser></AddedByUser>

         </div>:<div
        > </div>}

        {seeLiked ? 
        <div>
          <LikedByUser/>
          </div>:
          <div></div>}
      </div>

      
    </div>
  );
}
export default Login;