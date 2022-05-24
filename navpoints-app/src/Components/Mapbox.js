import { useState, useEffect, useCallback} from 'react';
import Map,  {FlyToInterpolator, Marker, GeolocateControl} from 'react-map-gl';





export default function MapBox() {
  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  return (
    <div>

      <Map
      // 50.84238125027097, 4.3228026337517385
      initialViewState={{
        longitude: 4.3228026337517385,
        latitude: 50.84238125027097,
        zoom: 15
      }}
      style={{width: '100vw', height: '45vh'}}
      mapStyle="mapbox://styles/manishnepali/ckvtkgrx423me14t72cizk5n9"
      mapboxAccessToken="pk.eyJ1IjoibWFuaXNobmVwYWxpIiwiYSI6ImNsM2h4Y3J3cTFnOWQzZXByODNobTZmZHcifQ.S-NfRKjOs4vOaW8jZnOmRw"
      >
         <GeolocateControl  ref={geolocateControlRef} showUserHeading={true}> button </GeolocateControl>
        </Map>
    

    </div>
  
  );
}
