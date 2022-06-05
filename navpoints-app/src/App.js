import MapBox from './Components/Mapbox';
import Start from './Components/Start'
import './App.css';
import Nav from './Components/Nav';
import Slider from './Components/Slider';
import { useState } from 'react';
import CameraPage from './Components/CameraPage';
function App() {
  
  return (
    <div className="App">
      <CameraPage/>
  <Start/>
     {/* <MapBox/>
    <Slider/>*/}
     <Nav/>
  
    </div>
  );
}

export default App;
