import { useState, useEffect} from 'react';
import styled, { createGlobalStyle } from "styled-components";
import home from "./Icons/home.svg"
import menu from "./Icons/menu-burger.svg"
import mapmarker from "./Icons/map-marker.svg"
import book from './Icons/book.svg'
import userIcon from './Icons/user.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import SelectPage from './SelectPage';

export default function Nav() {

 const [isClicked, setClicked] = useState('hidden');
  const account = Boolean(localStorage.getItem("loggedIn"));
 const [logged, setLogged] = useState(account);

 
function goToSelect(){

}


 function menuOpen(){
   if(isClicked == 'hidden'){
   setClicked('visible');
   }else{
     setClicked('hidden');
   }
 }
    return (
      <div id="nav" className=''>
        <button
        onClick={menuOpen}
                class="fixed z-30 right-4 p-4 bottom-4 w-16 h-16 bg-rose-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                  <img src={menu} className=""/>
        </button>
        
        <Link to="/journal">
             <button
          
               style={{visibility: isClicked}}
               class="fixed z-30 right-4 p-4 bottom-24 w-16 h-16 bg-rose-600 rounded-full transition ease-in duration-200 focus:outline-none"> 
                 <img src={home} className=""/>
       </button>  </Link>
  
       <a href='/maps'><button
               style={{visibility: isClicked}}
               class="fixed z-30 right-4 p-4 bottom-44 w-16 h-16 bg-rose-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                 <img src={mapmarker} className=""/>
       </button> 
       </a>
       { logged ?
       <a href='/journal'> <button
               style={{visibility: isClicked}}
               class="fixed z-30 right-4 p-4 bottom-64 w-16 h-16 bg-rose-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                 <img src={book} className=""/>
       </button> </a>:
       <button
       style={{visibility: isClicked}}
       class="fixed z-30 right-4 p-4 bottom-64 w-16 h-16 bg-rose-300 rounded-full  transition ease-in duration-200 focus:outline-none">
         <img src={book} className=""/>
</button>}


       <a href="/login"><button
        style={{visibility: isClicked}}
        class="fixed z-30 text-white right-4 p-4 mb-4 bottom-80 w-16 h-16 bg-rose-600 rounded-full">
        <img src={userIcon} className=""/>
       </button></a>
        </div>
     
    );
  }
  
 