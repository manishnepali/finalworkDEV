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

export default function Nav() {

 

    return (
     
        <div id="navbar"
        className="z-40 fixed bottom-0 flex  w-full bg-red-600 rounded-t-3xl">
      
          <div class="flex justify-around w-full">
        <span class="flex flex-col items-center  px-2 pt-2">
        <NavLink to="/explore"  
             style={isActive => ({
              backgroundColor: isActive ? "black" : "#DC2625",
              borderRadius: isActive ? "30%": "0"            })}>
           <svg 
           id="1"
           xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8" viewBox="0 0 20 20"
             fill="white">
          <path
            id="2"
           d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 
          000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2
           0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 
           2 0 010-3.464V4a1 1 0 011-1z" />
        </svg></NavLink>
                <NavLink  to='/explore'>
								<p
                id="1"
                class="font-bold text-white text-l mb-2 transition-all duration-200">
                setup
								</p></NavLink>
                </span>
                <span
               
                class="flex flex-col items-center px-2 pt-2">
                <NavLink  to="/maps"
        
               style={isActive => ({
                backgroundColor: isActive ? "black" : "#DC2625",
                borderRadius: isActive ? "30%": "0"
                
              })}>
                  <svg
                    id="2"
                  xmlns="http://www.w3.org/2000/svg" 
                class="h-8 w-8" viewBox="0 0 20 20" fill="white">
                  <path 
                    id="2"
                    fill-rule="evenodd"
                   d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1
                    0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 
                    3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1
                     1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
                </svg></NavLink>
							  <NavLink  to='/maps'>
                  	<p   
                    
                    id="2"
                    class="font-bold text-white text-l mb-2 transition-all duration-200">
									explore
								</p></NavLink>
                </span>
                <span class="flex flex-col items-center px-2 pt-2">
               <NavLink  to="/login"
              style={isActive => ({
                backgroundColor: isActive ? "black" : "#DC2625",
                borderRadius: isActive ? "30%": "0"              })}>
                <svg 
                  id="3"
                xmlns="http://www.w3.org/2000/svg" 
                class="h-8 w-8" viewBox="0 0 20 20" fill="white">
                    <path   
                    id="3"
                    fill-rule="evenodd" 
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                     clip-rule="evenodd" />
                  </svg></NavLink>
								<NavLink  to="/login">
                   <p 
                    id="3" 
                   class="font-bold text-white text-l mb-2 transition-all duration-200">
									profile
								</p></NavLink>
                </span>
                </div> 
                
        </div>
      
     
    );
  }
  
 