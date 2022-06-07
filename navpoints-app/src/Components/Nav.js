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
  Link
} from "react-router-dom";
export default function Nav() {
 const [isClicked, setClicked] = useState('hidden');
 



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
        
          <a href='/explore'><button
               style={{visibility: isClicked}}
               class="fixed z-30 right-4 p-4 bottom-24 w-16 h-16 bg-rose-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                 <img src={home} className=""/>
       </button> </a> 
       <a href='/maps'><button
               style={{visibility: isClicked}}
               class="fixed z-30 right-4 p-4 bottom-44 w-16 h-16 bg-rose-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                 <img src={mapmarker} className=""/>
       </button> </a>
       <a href='/journal'> <button
               style={{visibility: isClicked}}
               class="fixed z-30 right-4 p-4 bottom-64 w-16 h-16 bg-rose-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                 <img src={book} className=""/>
       </button> </a>
       <a href="/login"><button
        style={{visibility: isClicked}}
        class="fixed z-30 text-white right-4 p-4 mb-4 bottom-80 w-16 h-16 bg-rose-600 rounded-full">
        <img src={userIcon} className=""/>
       </button></a>
      
        </div>
     
    );
  }
  
 