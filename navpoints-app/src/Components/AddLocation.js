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
     arrayUnion,
    doc,
    updateDoc} from "../Backend/firebase"
import SelectPage from './SelectPage';
import MapBox from './Mapbox';




export default function AddLocation() {     
  const [dataEvent, setDataEvent] = useState([]);
 const [latitude, setLattitude] = useState([]);
 const [longitude, setLongituude] = useState([])
 const [data, setData] = useState([]);

const username = localStorage.getItem("username");
const userId = localStorage.getItem("userId");


/**
 * It gets the data from the database and sets it to the state
 */
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
 /* Generating a random number between 0 and 9999999 to use as an id for a new location that the user adds. */
 const randomNumber = Math.floor(Math.random() * 9999999);
    console.log(randomNumber)
randomNumber.toString();
 /* Getting the current location of the user and setting it to the state. */
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
/**
 * It takes the values from the form and creates a new document in the database
 * @param e - the event object
 */
const addEventLoc= async (e)=>{
  e.preventDefault();
  
  const select = document.getElementById("selcat");
  const selectedCategory = select.options[select.selectedIndex].value;
  const selectedCategoryname = select.options[select.selectedIndex].text;
  const newDescription = document.getElementById("description").value;
  console.log(selectedCategory);
  const newPlaceName = document.getElementById("newPlace").value;
  const newPlaceId = document.getElementById("newId").textContent;


  console.log(newPlaceId);
 const docRef = doc(db, "geo_location", newPlaceId);
  const payload = {name : newPlaceName,
                    geometry:{
                      _long: longitude,
                      _lat: latitude
                    },
                  eventIcon: selectedCategory,
                creator: username,
                creatorId : userId,
              categoryName: selectedCategoryname,
            description: newDescription,
          likes:0 }
// const docUser = doc(db, "users", userId);
// const createdId = {created: arrayUnion(newPlaceId)} ;
if(longitude == "" && latitude == ""){
alert("set your location on to perform this action")
}else if(newPlaceName == "" || newDescription == ""){
  alert("fill the name and desrription boxes")
}
else{
  await setDoc(docRef, payload);
  // await setDoc(docUser, createdId);
  alert("done");
}
 
  
}
  return (
    <div className=''>
        <Router>
            <Switch>
           
             
                <Route exact path="/addLocation">
                
                    <div 
                    className='w-4/5 h-3/4 top-1/4 flex flex-col ml-12 p-12 '>
                        

                

                        <label className='font-bold text-5xl'> add a new location:</label>
                        <p>id:</p><p
                    id="newId"
                    class="font-bold text-gray-800 " 
                    >
                     {randomNumber} </p>

                    <input
                    id="newPlace"
                    class="rounded-lg p-2  font-bold border text-gray-800 border-black bg-white my-4" 
                      placeholder="name for this hotspot"/>
                            <input
                    id="description"
                    class="rounded-lg p-2  font-bold border text-gray-800 border-black bg-white my-4 h-20" 
                      placeholder="description"/>
                      <h1 className='font-bold text-xl'>choose a Category</h1>
                      <select id="selcat"
                      className="my-4 font-bold text-xl p-4 border-black border">
                        {data.map((category, index) => {
                        return  <option key={index} value={category.img} >{category.name}</option>
                        })}
                          </select>
                        <button 
                    onClick={addEventLoc}
                    class="px-8 rounded-lg bg-red-600  
                    text-white font-bold p-4  my-4">
                       
                      add</button>
                    
                     <Link to="/maps">
                      <button 
                    class="px-8 rounded-lg bg-red-600  
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
