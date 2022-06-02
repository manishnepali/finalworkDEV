import { useState, useEffect, useCallback} from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import Map,  {FlyToInterpolator, Marker, GeolocateControl, NavigationControl} from 'react-map-gl';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";





export default function MapBox() {
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

      <Map
      // 50.84238125027097, 4.3228026337517385
      initialViewState={{
        longitude: 4.3228026337517385,
        latitude: 50.84238125027097,
        zoom: 19
      }}
      style={{width: '100vw', height: '70vh'}}
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
          position={'bottom-right'}
          ></GeolocateControl>
        </Map>
    
          <div className='container absolute bg-white box-border w-screen  rounded-t-2xl items-center -bottom-2/4' >
                <ul className='flex flex-col justify-center pl-4 pt-8 pb-64  mx-auto'>
                     <li> <Link to="/">
                       <svg class="w-16 h-16  dark:text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
                     </Link> </li>
               
                    </ul>
   
                    
                </div>  
    </div>
  
  );
}
