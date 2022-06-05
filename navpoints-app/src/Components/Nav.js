import { useState, useEffect} from 'react';
import styled, { createGlobalStyle } from "styled-components";
import home from "./Icons/home.svg"
import menu from "./Icons/menu-burger.svg"
import mapmarker from "./Icons/map-markerActive.svg"
import book from './Icons/book.svg'
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
      <div id="nav">
        <button
        onClick={menuOpen}
                class="fixed right-4 p-4 bottom-4 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                  <img src={menu} className=""/>
        </button>
        
           <button
               style={{visibility: isClicked}}
               class="fixed z-10 right-4 p-4 bottom-24 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                 <img src={home} className=""/>
       </button> <button
               style={{visibility: isClicked}}
               class="fixed z-10 right-4 p-4 bottom-44 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                 <img src={mapmarker} className=""/>
       </button>  <button
               style={{visibility: isClicked}}
               class="fixed z-10 right-4 p-4 bottom-64 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                 <img src={book} className=""/>
       </button> 

   
        </div>
     
    );
  }
  
 