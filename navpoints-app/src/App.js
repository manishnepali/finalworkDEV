import MapBox from './Components/Mapbox';
import Start from './Components/Start'
import './App.css';
import Nav from './Components/Nav';
import Journal from './Components/Journal';
import SelectPage from './Components/SelectPage';
import Slider from './Components/Slider';
import { useState } from 'react';
import CameraPage from './Components/CameraPage';
import LogIn from './Backend/LogIn';
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

function App() {
  const [isClicked, setClicked] = useState('hidden');
  // const account = Boolean(localStorage.getItem("loggedIn"));
 const [logged, setLogged] = useState();


 
function goToSelect(){

}


 function menuOpen(){
   if(isClicked == 'hidden'){
   setClicked('visible');
   setLogged(Boolean(localStorage.getItem("loggedIn")));
    console.log(logged)
   }else{
     setClicked('hidden');
     setLogged(Boolean(localStorage.getItem("loggedIn")));
     console.log(logged)
   };
   
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
        </Switch>
     

      <div id="nav" className=''>
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
        </div>
        </Router>
       
    </div>
    
  );
}

export default App;
