import { useState, useEffect, useCallback} from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import data from './data/geoData.json';
import Map,  {FlyToInterpolator, Marker, GeolocateControl, NavigationControl, Directions, Layer} from 'react-map-gl';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CameraPage from './CameraPage';
import SelectPage from './SelectPage';





export default function MapBox() {


  const[ mapsOption, setOption ] = useState("visible");

const imgg = "https://cdn.iconscout.com/icon/free/png-256/bar-606-1106181.png";
  console.log(data)
const geo = data.geometry;
     
  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);
  const [viewport, setViewport] = useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });


  return (
    <div className='relative'>
 <Router>
            <Switch>
             
           
             <Route exact path="/maps">
      <Map
      // 50.84238125027097, 4.3228026337517385
      initialViewState={{
        longitude: 4.3228026337517385,
        latitude: 50.84238125027097,
        zoom: 16
      }}
      style={{width: '100vw', height: '60vh'}}
      mapStyle="mapbox://styles/manishnepali/cl3kqms8x00ab14mfbcd19347"
      mapboxAccessToken="pk.eyJ1IjoibWFuaXNobmVwYWxpIiwiYSI6ImNsM2h4Y3J3cTFnOWQzZXByODNobTZmZHcifQ.S-NfRKjOs4vOaW8jZnOmRw"
    
    >
      
         <NavigationControl/>
          <GeolocateControl
          ref={geolocateControlRef}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showAccuracyCircle={true}
          showUserLocation={true}
          showUserHeading={true}
          position={'top-left'}
          ></GeolocateControl>


          
           <Marker
          longitude={4.3228026337517385}
          latitude={50.84238125027097}>
          erasmuserzrz
          </Marker> 
         
          
          <Marker longitude={-100} latitude={40} anchor="bottom" >
      <img src="./pin.png" />
    </Marker>
         
         {data.map(location=>(
            <Marker 
            key={location.id}
            longitude={location.geometry.coordinates[1]}
               latitude={location.geometry.coordinates[0]}>
                <h1>TESSSSST</h1>
              </Marker>
         ) )} 
         
      
          
        </Map>
    
          <div className='z-20 container absolute bg-white box-border w-screen  rounded-t-2xl items-center -bottom-2/4' >
                <ul className='flex flex-col justify-center pl-4 pt-8   mx-auto'>
                     <li> <Link to="/explore">
                       <svg class="w-16 h-16  dark:text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
                     </Link> </li>
               </ul>
               {/* <ul className="max-h-60  overflow-auto ml-4 mr-4"> */}
                    <ul className='divide-y divide-gray-200 dark:divide-gray-700 max-h-60  overflow-auto '>
     
                    {data.map((location, index)=>{
                      return <li className='py-8 sm:py-8 flex space-x-16 ml-4'>
                        <img 
                        className='w-8 h-8 rounded-full'
                        src={imgg}></img>
                        <h1 className="font-bold truncate text-xl text-black mt-4 ml-4 "
                        key={index}>{location.properties.name} </h1>
                        <span id="loc" 
                        className='float-right mr-8'>
                        <p>lat: {location.geometry.coordinates[1]}</p>
                        <p>long: {location.geometry.coordinates[0]}</p>
                        <h3>{location.type}</h3> 
                        </span></li>
                    })}
                  </ul>
                 
               <button
               style={{visibility: mapsOption}}
               class="fixed z-10 right-24 p-4 bottom-4 w-16 h-16 bg-blue-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
             <Link exact path="/camera">    <svg viewBox="0 0 20 20"  class="w-6 h-6 inline-block">
            <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z" />
          </svg>  </Link>
       </button>
      
              
                   
   
                    
                </div>  
                </Route>
                <Route exact path="/camera">
                <CameraPage/>
                </Route>
                <Route exact path="/explore">
                <SelectPage/>
                </Route>
               
                </Switch>
                </Router>
    </div>
  
  );
}
