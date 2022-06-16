import { useState, useEffect} from 'react';
import MapBox from './Mapbox';
import SelectPage from './SelectPage'
import Login from './LogIn';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Journal from './Journal';

export default function Start() {
  localStorage.setItem("mapsOption", false);
  const logged = localStorage.getItem("logged");
  const loggedIn = localStorage.getItem("loggedIn")
  const [exButton, setExButton] = useState(Boolean(loggedIn));
  console.log(exButton);
  
    return (
        <div className="">
            <Router>
            <Switch>
             
           
             <Route exact path="/">
            
            <div className='bg-backimg bg-center bg-cover  h-screen overflow-hidden'>
            <img className ="fixed top-10 left-1/4 w-2/4 "
              src="https://i.ibb.co/dKzS64v/navitlogo.png"/>


                <div className='container  resize-y bg-white box-border h-2/3 relative top-1/2 w-screen lg:ml-4 md:ml-4 rounded-t-2xl items-center' >
                <ul className='flex flex-col justify-center  p-4 mx-auto'>
                  <p>account: {logged}</p>
                     <h1 className="font-bold text-5xl">
                    Discover what’s near you.
                    </h1>
                    {exButton ?
                     <li> <Link to="/explore"><button class="bg-red-600 w-2/3 ml-16 text-3xl text-white font-bold py-3 px-5 rounded-full mt-4 items-stretch ">
                     Let's start 
                       </button></Link> </li>:
                        <li> <Link to="/login"><button class="bg-red-600 w-2/3 ml-16 text-xl text-white font-bold py-3 px-5 rounded-full mt-4 items-stretch ">
                        log in with google
                          </button></Link> </li> }
                  
                    </ul>
   
                    
                </div>
     
            </div> 
            </Route>
             
           
                <Route exact path="/explore">
                <SelectPage/>
                </Route>
                <Route exact path="/journal">
                <Journal/>
                </Route>
                <Route exact path="/maps">
                <MapBox/>
                </Route>
                <Route exact path="/login">
                      <Login/>
                </Route>
            </Switch>
            </Router>
      </div>
    );
  }