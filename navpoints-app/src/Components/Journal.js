import { useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import data from './data/profile.json';



function Journal() {
  const profile = "https://i.ibb.co/8KypTMS/wxnish.png"

  
    return (
      <div id="journal"
      className="flex">
           <Router>
            <Switch>
             
           
             <Route exact path="/journal">
          
            
              <div id="background_journal" 
              class=" z-10 absolute top-0 w-full h-full bg-center bg-cover bg-backimg" >
               
                  <div className='container lg:ml-4 md:ml-4 resize-y bg-white box-border h-4/4 relative top-1/4 w-screen pb-36 rounded-t-2xl items-center' >
               
              
                    <h1 className="font-bold text-5xl ml-4">
                    journal is loaded
                   </h1>
            
                   {/* <ul className="grid grid-cols-2 max-h-60 mt-10 overflow-y-auto ml-4 mr-4">
                   
                     <li>
                         <h1 className="text-4xl text-black font-bold mt-4 ml-4"></h1> </li>
                    
                   </ul> */}
                  
                   
               </div> 
               
             </div>
           
             
              
             </Route>
       </Switch>
       </Router>
    
      </div>
    );
  }
  
  export default Journal;
  