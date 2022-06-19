import { useState, useEffect} from 'react';
import MapBox from './Mapbox';
import SelectPage from './SelectPage'
import Login from './LogIn';
import Nav from './Nav';
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
  
  const [popupDownload,setPopupDownload] = useState(true)
/**
 * If the popupDownload state is true, then set the popupDownload state to false
 */
function showPopup(){

  if(popupDownload === true){
    setPopupDownload(false);
  }
}


    return (
        <div className="">
            <Router>
            <Switch>
             
           
             <Route exact path="/">
            
            <div className='bg-backimg bg-center bg-cover  h-screen overflow-hidden'>
            <img className ="fixed top-10 left-1/3 w-2/6 drop-shadow-md"
              src="https://i.ibb.co/dKzS64v/navitlogo.png"/>


                <div className='container  resize-y bg-white box-border h-full relative top-1/4 w-5/6 mx-8 rounded-t-2xl items-center' >
                <ul className='flex flex-col h-3/5 justify-around p-4 mx-auto'>
                  <p>account: {logged}</p>
                     <h1 className="font-bold text-5xl ">
                    Discover what’s near you.
                    </h1>
                    {exButton ?
                     <li> <Link to="/explore">
                      <button 
                      className="bg-red-600  text-3xl
                      text-white font-bold py-3 px-4 rounded-lg w-full
                        ">
                     Let's start 
                       </button></Link> </li>:
                        <li> 
                          {popupDownload?
                           <div className="fixed transition  ease-in duration-1000 top-36 drop-shadow-md container 
                           bg-white  w-3/4 ml-1/4 p-2 rounded-xl" >
                          
                           <br/>
                           <span className="w-3/4 h-28 font-bold mx-8 text-justify">
                          
                             <h1 className=' text-l'>If you are using the browser version download the application for the best experince on your 
                             device, by adding it on to your homescreen.</h1>
                             </span>
                             <button 
                             onClick={showPopup}
                           className="bg-red-600  text-xl
                           text-white font-bold  rounded-lg w-1/4
                           float-right
                             ">
                         okay
                           </button>
                             </div>:
                          <></>}
                            <Link to="/login">
                          <button 
                          className="bg-red-600  text-3xl
                          text-white font-bold py-3 px-4 rounded-lg w-full
                            ">
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