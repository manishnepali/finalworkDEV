import { useState, useEffect} from 'react';
import MapBox from './Mapbox';
import SelectPage from './SelectPage'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
export default function Start() {
  localStorage.setItem("mapsOption", false);
 const backimg = "https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670";
 
    return (
        <div className="">
            <Router>
            <Switch>
             
           
             <Route exact path="/">
            <div className='bg-backimg h-screen overflow-hidden'>
               
                <div className='container  resize-y bg-white box-border h-2/3 relative top-1/2 w-screen lg:ml-4 md:ml-4 rounded-t-2xl items-center' >
                <ul className='flex flex-col justify-center  p-4 mx-auto'>
                     <h1 className="font-bold text-5xl">
                    Discover what’s near you.
                    </h1>
                   <li> <Link to="/explore"><button class="bg-rose-600 w-2/3 ml-16 text-3xl text-white font-bold py-3 px-5 rounded-full mt-4 items-stretch ">
                  let's start 
                    </button></Link> </li>
                    </ul>
   
                    
                </div>
                
            </div>       
            </Route>
             
           
                <Route exact path="/explore">
                <SelectPage/>
                </Route>
            </Switch>
            </Router>
      </div>
    );
  }