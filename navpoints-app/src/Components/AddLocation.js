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
 const [data, setData] = useState([]);

const username = localStorage.getItem("username");
 //get data from fiebase
 const getData = async() =>{
   const q = query(collection(db, "event_category"));

   const querySnapshot = await getDocs(q);
   const dataSet = querySnapshot.docs.map((doc) => ({
     ...doc.data(),
     id: doc.id
   }));
   setData(dataSet);
   console.log(dataSet)
 } 
 

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      setLattitude(position.coords.latitude);
      setLongituude(position.coords.longitude);
      localStorage.setItem("uses_lat", latitude);
      localStorage.setItem('user_long', longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    }
    );
    getData();
    console.log("event catagory",data);
  },[])


const [newEvent, setNewEvent] = useState([])
const addEventLoc= async (e)=>{
  e.preventDefault();
  const select = document.getElementById("selcat");
  const selectedCategory = select.options[select.selectedIndex].value;
  const selectedCategoryname = select.options[select.selectedIndex].text;
  console.log(selectedCategory);
  const newPlaceName = document.getElementById("newPlace").value;
  const newPlaceId = document.getElementById("newId").value;
  console.log(newPlaceName);
 const docRef = doc(db, "geo_location", newPlaceId);
  const payload = {name : newPlaceName,
                    geometry:{
                      _long: longitude,
                      _lat: latitude
                    },
                  eventIcon: selectedCategory,
                creator: username,
              categoryName: selectedCategoryname }
  await setDoc(docRef, payload);
  alert("done");
  
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
                      <select id="selcat"
                      className="my-4 font-bold text-xl p-4 border-black border">
                        {data.map((category, index) => {
                        return  <option key={index} value={category.img} >{category.name}</option>
                        })}
                          </select>
                        <button 
                    onClick={addEventLoc}
                    class="px-8 rounded-lg bg-rose-400  
                    text-white font-bold p-4  my-4">
                       
                      add</button>

                     <Link to="/maps"><button 
                    class="px-4 rounded-lg bg-rose-400  
                    text-white font-bold p-4  my-4">
                       
                      go back</button></Link> 
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
