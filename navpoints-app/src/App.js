import MapBox from './Components/Mapbox';
import Start from './Components/Start'
import './App.css';
import Nav from './Components/Nav';
import Slider from './Components/Slider';
import { useState } from 'react';
import CameraPage from './Components/CameraPage';
import LogIn from './LogIn';
function App() {
  
  return (
    <div className="App">
   <Start/> 
     <Nav/>
  
    </div>
  );
}

export default App;
