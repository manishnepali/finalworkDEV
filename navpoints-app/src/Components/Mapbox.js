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
    <div className='z-0'>

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
           style={{backgroundColor : "green", padding: "20%"}}>location</GeolocateControl>
        </Map>
    
         {/* <div className='container bg-white box-border h-3/4 relative -top-3/4 w-screen  rounded-t-2xl items-center z-10' >
                <ul className='flex flex-col justify-center  p-4 mx-auto'>
                     <li> <Link to="/"><button class="bg-rose-700 w-1/3 text-xl text-white font-bold py-3 px-1 rounded-full mt-4 items-stretch ">
                  go back
                    </button></Link> </li>
               
                    </ul>
   
                    
                </div>  */}
    </div>
  
  );
}
