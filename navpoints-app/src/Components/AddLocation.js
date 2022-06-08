import { useState, useEffect, useCallback} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {db, 
  collection,
   getDocs,
    where, 
    query, 
    setDoc,
     addDoc,
    doc} from "../Backend/firebase"
import SelectPage from './SelectPage';
import MapBox from './Mapbox';




export default function AddLocation() {     
  const [dataEvent, setDataEvent] = useState([]);
 const [latitude, setLattitude] = useState([]);
 const [longitude, setLongituude] = useState([])
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      setLattitude(position.coords.latitude);
      setLongituude(position.coords.longitude);
      localStorage.setItem("uses_lat", latitude);
      localStorage.setItem('user_long', longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  },[])


const [newEvent, setNewEvent] = useState([])
const addEventLoc= async (e)=>{
  e.preventDefault();
  const newPlaceName = document.getElementById("newPlace").value;
  const newPlaceId = document.getElementById("newId").value;
  console.log(newPlaceName);
 const docRef = doc(db, "geo_location", newPlaceId);
  const payload = {name : newPlaceName,
                    geometry:{
                      _long: longitude,
                      _lat: latitude
                    }}
  await setDoc(docRef, payload);
  alert("done");
  window.location('/explore')
}
  return (
    <div className=''>
        <Router>
            <Switch>
           
             
                <Route exact path="/addLocation">
                    <div 
                    className='w-4/5 h-3/4 top-1/4 flex flex-col ml-12 p-12  mt-32'>
                        <label className='font-bold text-5xl'> add a new location:</label>
                        <input
                    id="newId"
                    class="rounded-lg p-4  font-bold border text-gray-800 border-black bg-white my-4 w-2/4" 
                      placeholder="nickname"/>
                    <input
                    id="newPlace"
                    class="rounded-lg p-4  font-bold border text-gray-800 border-black bg-white my-4" 
                      placeholder="name for this hotspot"/>
                      
                      <h1 className='font-bold text-xl'>choose a catagory</h1>
                    <select class="my-4 font-bold text-xl p-4 border-black border" >
                       <option>drink</option>
                       <option>relax</option>
                       <option>snacks</option>
                       <option>sport</option>
                       <option>coffee</option>
                       <option>museam</option>
                        </select>

                        <button 
                    onClick={addEventLoc}
                    class="px-8 rounded-lg bg-rose-400  
                    text-white font-bold p-4 uppercase my-4">
                       
                      add</button>
                    </div>
                    
                  
                </Route>
                <Route exact path="/maps">
                <MapBox/>
                </Route>
                <Route exact path="/explore">
                <SelectPage/>
                </Route>
               
                </Switch>
                </Router>
    </div>
  
  );
}
