import MapBox from './Components/Mapbox';
import Start from './Components/Start'
import './App.css';
import Nav from './Components/Nav';
import Journal from './Components/Journal';
import SelectPage from './Components/SelectPage';
import Slider from './Components/Slider';
import { useEffect, useState } from 'react';
import LogIn from './Components/LogIn';
import home from "./Components/Icons/home.svg"
import menu from "./Components/Icons/menu-burger.svg"
import mapmarker from "./Components/Icons/map-marker.svg"
import book from './Components/Icons/book.svg'
import userIcon from './Components/Icons/user.svg'
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory } from "react-router-dom";
import AddLocation from './Components/AddLocation';
import AddedByUser from './Components/AddedByUser';

function App() {

  const [setup, setSetup] = useState("white");
  const [maps, setMaps] = useState("white");
  const [profile, setProfile] = useState("white");
  const [setNav, getNav] = useState("1")
function navigationEffect(e){
  const getNav = e.target.id;
  console.log(getNav);
  if(getNav == "1"){
    setSetup("#ffff9f");
    setMaps("white");
    setProfile("white");
  }else if(getNav == "2"){
    setSetup("white");
    setMaps("#ffff9f");
    setProfile("white");
  }else if(getNav == "3"){
    setSetup("white");
    setMaps("white");
    setProfile("#ffff9f");
  }else{
    setSetup("white");
    setMaps("white");
    setProfile("white");
  }



}



   
 
  return (
    <div className="App">
     <Router>
        <Switch>
          <Route exact path = "/">
          <Start/> 

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
                      <LogIn/>
                </Route>
                <Route exact path="/addLocation">
                  <AddLocation/>
                </Route>
        </Switch>
       
        <div id="navbar"
        className="z-40 fixed bottom-0 flex  w-full bg-red-600 rounded-t-3xl">
      
          <div class="flex justify-around w-full">
        <span class="flex flex-col items-center  px-2 pt-2">
        <Link to='/explore'>
           <svg 
           style={{fill: setup}}
           onClick={navigationEffect}
           id="1"
           xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8" viewBox="0 0 20 20"
             fill="white">
          <path
          onClick={navigationEffect}
            id="2"
           d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 
          000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2
           0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 
           2 0 010-3.464V4a1 1 0 011-1z" />
        </svg></Link>
                <Link to='/explore'>
								<p
                onClick={navigationEffect}
                style={{color: setup}}
                id="1"
                class="font-bold text-white text-l mb-2 transition-all duration-200">
                setup
								</p></Link>
                </span>
                <span
               
                class="flex flex-col items-center px-2 pt-2">
                <Link to='/maps'>
                  <svg
                  onClick={navigationEffect}
                  style={{fill: maps}}
                    id="2"
                  xmlns="http://www.w3.org/2000/svg" 
                class="h-8 w-8" viewBox="0 0 20 20" fill="white">
                  <path 
                  onClick={navigationEffect}
                    id="2"
                    fill-rule="evenodd"
                   d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1
                    0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 
                    3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1
                     1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
                </svg></Link>
							  <Link to='/maps'>
                  	<p   
                    
                    onClick={navigationEffect}
                    style={{color: maps}}
                    id="2"
                    class="font-bold text-white text-l mb-2 transition-all duration-200">
									explore
								</p></Link>
                </span>
                <span class="flex flex-col items-center px-2 pt-2">
               <Link to="/login">
                <svg 
                style={{fill: profile}}
                onClick={navigationEffect}
                  id="3"
                xmlns="http://www.w3.org/2000/svg" 
                class="h-8 w-8" viewBox="0 0 20 20" fill="white">
                    <path   
                    onClick={navigationEffect}
                    id="3"
                    fill-rule="evenodd" 
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                     clip-rule="evenodd" />
                  </svg></Link>
								<Link to="/login">
                   <p 
                   style={{color: profile}}
                   onClick={navigationEffect}
                    id="3" 
                   class="font-bold text-white text-l mb-2 transition-all duration-200">
									profile
								</p></Link>
                </span>
                </div> 
        </div>
     
      {/* <div id="nav" className=''>
        <button
        onClick={menuOpen}
                class="fixed z-30 right-4 p-4 bottom-4 w-16 h-16 bg-rose-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                  <img src={menu} className=""/>
        </button>
        
        <Link to="/explore">
             <button
          
               style={{visibility: isClicked}}
               class="fixed z-30 right-4 p-4 bottom-24 w-16 h-16 bg-rose-600 rounded-full transition ease-in duration-200 focus:outline-none"> 
                 <img src={home} className=""/>
       </button>  </Link>
  
       <Link to='/maps'><button
               style={{visibility: isClicked}}
               class="fixed z-30 right-4 p-4 bottom-44 w-16 h-16 bg-rose-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                 <img src={mapmarker} className=""/>
       </button> 
       </Link>
       { logged ?
       <Link to='/journal'> <button
               style={{visibility: isClicked}}
               class="fixed z-30 right-4 p-4 bottom-64 w-16 h-16 bg-rose-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                 <img src={book} className=""/>
       </button> </Link>:
       <button
       style={{visibility: isClicked}}
       class="fixed z-30 right-4 p-4 bottom-64 w-16 h-16 bg-rose-300 rounded-full  transition ease-in duration-200 focus:outline-none">
         <img src={book} className=""/>
</button>}


       <Link to="/login"><button
        style={{visibility: isClicked}}
        class="fixed z-30 text-white right-4 p-4 mb-4 bottom-80 w-16 h-16 bg-rose-600 rounded-full">
        <img src={userIcon} className=""/>
       </button></Link>
       </div> */}
        </Router> 
       
    </div>
    
  );
}

export default App;
