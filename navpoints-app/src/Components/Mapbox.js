import { useState, useEffect, useCallback} from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import data from './data/geoData.json';
import Map, { Marker, 
  GeolocateControl,
   NavigationControl, 
   useMap,
   Layer
} from 'react-map-gl';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CameraPage from './CameraPage';
import SelectPage from './SelectPage';
import eye from './Icons/eye.svg'
import {db, 
  collection,
   getDocs,
    where, 
    query, 
    setDoc,
     addDoc,
     updateDoc,
     arrayUnion,
    doc} from "../Backend/firebase"
import mapboxgl from 'mapbox-gl';
import AddLocation from './AddLocation';
import { map } from '@firebase/util';


// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;




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
          console.log(ref);

        }, []);
      
        const [dataEvent, setDataEvent] = useState([]);
        const [userLattitude, setLattitude] = useState(4.3228026337517385);
        const [userLongitude, setLongituude] = useState(50.84238125027097);
        const [viewport, setViewport] = useState({
          longitude: userLattitude,
          latitude: userLongitude,
          zoom: 14
        });

        //get data from fiebase
        const getData = async() =>{
          const q = query(collection(db, "geo_location"));

          const querySnapshot = await getDocs(q);
          const dataSet = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }));
          setDataEvent(dataSet);
          console.log(dataSet)
        } 
        useEffect(()=>{
          navigator.geolocation.getCurrentPosition(function(position) {
            setLattitude(position.coords.longitude);
            setLongituude(position.coords.latitude);
            setViewport({
              longitude: position.coords.latitude,
              latitude: position.coords.longitude,
              zoom: 14
            })
          console.log("cor loc:", userLattitude, userLongitude, viewport);
          }
          );        
          getData();
          console.log("event catagory",dataEvent)
        },[])
  
        
      const [detailPage, setDetailPage] = useState(false);
      const [dq, setDq] = useState() ;
      const filterQuery = sessionStorage.getItem("filterQuery");
      console.log(filterQuery);
      function goToDetail(e){
        
        console.log(e.target.id)
        const toGetDetail = e.target.id;
        sessionStorage.setItem("detailQuery", toGetDetail);
        setDq(toGetDetail)
        setDetailPage(true)
        const lattDetail = dataEvent[dq].geometry._lat;
        const longDetail = dataEvent[dq].geometry._long;
        setNavToPosition([longDetail, lattDetail])
        
      
        // Map.flyTo(data[e.target.key].geometry.coordinates)
      }
      const [test, setTest] = useState(true);
     

      function goBackToMap(){
      setDetailPage(false);
      setTest(false);
      setBeforeLike(true);
      setLiked("none")
      setNavToPosition([ userLattitude , userLongitude])
      }

      const [newEvent, setNewEvent] = useState([])
      const addEventLoc= async (e)=>{
        e.preventDefault();
        const docRef = doc(db, "new_events", "002");
        const payload = {test : "a new event"}
        await setDoc(docRef, payload)
      }

      const [navToPosition, setNavToPosition] = useState([ userLattitude , userLongitude]);
      function setWaypoint(){

        setTest(true)
        const lattDetail = dataEvent[dq].geometry._lat;
        const longDetail = dataEvent[dq].geometry._long;
        setNavToPosition([lattDetail, longDetail])
          
          // console.log(lattDetail, longDetail);
          // setViewport({
          //   longitude: longDetail,
          //   latitude: lattDetail,
          //   zoom: 14
          // })
        }
      function NavigateButton() {
        
        const {current: map} = useMap();
        
          map.flyTo({center: navToPosition, zoom: 19});
        
      }

      const [isLiked, setLiked] = useState("none");
      const [countLikes, setLikes] = useState(document.getElementById('currentLikes'));
      const [beforeLike, setBeforeLike] = useState(true)
     console.log(beforeLike)
      async function submit(e){   
        console.log("oldLikes",parseInt(countLikes)) 
        setLikes(document.getElementById('currentLikes'));
        const newLiked = parseInt(dataEvent[dq].likes);
        console.log(newLiked)

            if(isLiked == "none" && beforeLike == true){
              setLikes(newLiked+1);
              console.log(countLikes) 

              setLiked("red");
              setBeforeLike(false);
              const docRef = doc(db, "geo_location", dataEvent[dq].id);
              const payload = {likes : countLikes}
              await updateDoc(docRef, payload)
      
            }else if(isLiked == "red" && beforeLike == false){
              setLikes(countLikes-1); 
              console.log(countLikes) 
              setLiked("none");
              setBeforeLike(true);
              const docRef = doc(db, "geo_location", dataEvent[dq].id);
              const payload = {likes : countLikes}
              await updateDoc(docRef, payload)
            }
      }
   

      
      


  return (
    <div className='relative'>
 <Router>
            <Switch>
           
             <Route exact path="/maps">
      <Map
       {...viewport}
       onMove={evt => setViewport(evt.viewport)}
      style={{width: '100vw', height: '60vh'}}
      mapStyle="mapbox://styles/manishnepali/cl3kqms8x00ab14mfbcd19347"
      mapboxAccessToken="pk.eyJ1IjoibWFuaXNobmVwYWxpIiwiYSI6ImNsM2h4Y3J3cTFnOWQzZXByODNobTZmZHcifQ.S-NfRKjOs4vOaW8jZnOmRw"
      onViewportChange={viewport}
      
    >
      
         <NavigationControl/>
          <GeolocateControl
          ref={geolocateControlRef}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showAccuracyCircle={true}
          showUserLocation={true}
          showUserHeading={true}
          position={'top-right'}
          ></GeolocateControl>


        {dataEvent.map(event=>(
                    <Marker 
                    key={event.id}
                    longitude={event.geometry._long}
                      latitude={event.geometry._lat}
                      scale={2}>
                        <div
                        className="flex flex-col items-center w-20 h-20">
                        <img 
                                className='w-8 h-8 rounded-full bg-black'
                                src={event.eventIcon}></img>
                                
                        <h1 className='font-medium  text-l text-black '>{event.name}</h1>
                        </div>
                      </Marker>
                ) )} 
                <NavigateButton/>
         
       
          
        </Map>
    
          <div
          id="eventContainer"
           className='z-20 container absolute bg-white box-border w-screen   rounded-t-2xl items-center top-2/4 mt-8' >
            

                    {
                      detailPage ? 
                      <div id="eventDetail">
                        
                   <div className='flex align-middle'>
                                  <svg xmlns="http://www.w3.org/2000/svg" 
                                  class="h-14 w-14 my-4 ml-4" viewBox="0 0 20 20" 
                                  fill="#DC2625"
                                  onClick={goBackToMap}>
                              <path fill-rule="evenodd"
                               d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                                clip-rule="evenodd" />
                            </svg> 
                            <h1
                                  className="font-black text-xl pt-6 ml-2 text-left ">
                                      {dataEvent[dq].name}
                                    </h1></div>
                            

                             <span className='flex jusify-around  w-full'>
                                
                                   
                                    <img
                                className='w-20 h-20 my-4 mx-4'          
                                src={dataEvent[dq].eventIcon}
                                  /> 
                                   <p
                                  className="font-bold w- text-l my-4 mx-4 text-justify overflow-y-auto max-h-30
                                  md:max-w-md md:p-0">
                                    {dataEvent[dq].description}</p>
                                     </span>
                          <div id="detailContainer"
                            className='basis-0 grow  mx-2 text-center md:text-left md:flex md:flex-col md:justify-center md:items-center
                            '>
                                 
                                 
                              <span className='flex justify-around  w-full'>
                                  <p className='font-bold 
                                  text-gray-500 text-sm p-4
                                  md:max-w-md md:p-0'>created by {dataEvent[dq].creator}</p>
                                  <button
                                  className=''
                                  onClick={submit}>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    className="h-16 w-16"
                                    style={{backgroundColor : ""}}
                                     fill={isLiked} 
                                    viewBox="0 0 24 24" stroke="red" 
                                    strokeWidth={1}>
                                      <path strokeLinecap="round" 
                                      strokeLinejoin="round"
                                       d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {beforeLike ? <p id="currentLikes"> {dataEvent[dq].likes}</p>:
                                     <p> {countLikes}</p>}
                                   
                                    
                                    </button>
                                    </span>
                                    
                              <button 
                              class="px-4 rounded-lg bg-red-600  
                              text-white text-xl font-bold p-4  my-4">
                                set waypoint
                                </button>
                                </div>
                        </div>:
                         <div id="eventList"
                         className=''>   
                           
                           
                            <div className='flex justify-around w-full py-2  border-gray-200'>
                              <span>
                                  <Link to="/explore">
                                  <svg xmlns="http://www.w3.org/2000/svg" 
                                  class="h-14 w-14 ml-4" viewBox="0 0 20 20" 
                                  fill="#DC2625">
                              <path fill-rule="evenodd"
                               d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                                clip-rule="evenodd" />
                            </svg></Link></span>
                     
                            <span className='w-3/5'></span>
                            <span className='mr-4'>
                                          <Link to="/addLocation">  
                                   
                                              <svg xmlns="http://www.w3.org/2000/svg"
                                              style={{visibility: mapsOption}}
                                               className="h-14 w-14" viewBox="0 0 20 20"
                                               fill="#DC2625">
                                                  <path fill-rule="evenodd"
                                                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" 
                                                   clip-rule="evenodd" />
                                                </svg>
                                               
                                  </Link> </span>
                                 
                            </div>
                             <ul className='divide-y divide-gray-200 dark:divide-gray-700 h-80  my-4 overflow-auto '>
     
                                    {dataEvent.map((event, index)=>{
                                    if(filterQuery == event.categoryName){
                                      return <li className=''>
                                         
                                            
                                           
                                        <span className='flex flex-row py-8 sm:py-8 h-full justify-around align-baseline ml-4'>

                                        <img 
                                        
                                        className='w-20 h-20 rounded-full'
                                        src={event.eventIcon}></img>

                                        <h1 className="font-bold  text-xl text-black mt-4 w-3/6 "
                                        key={index}> {event.name}  </h1>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             onClick={goToDetail}
                                             id={index}
                                             class="h-14 w-14 mr-4" viewBox="0 0 20 20" 
                                             fill="#DC2625">
                                            <path 
                                            id={index} d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path id={index} 
                                            fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                          </svg>
                                    </span>
                                    
                                        {/* <span id="loc" 
                                        className='float-right mr-8'>
                                        <p>lat: {location.geometry.coordinates[1]}</p>
                                        <p>long: {location.geometry.coordinates[0]}</p>
                                        <h3>{location.type}</h3> 
                                        </span> */}
                                          </li>}
                                      })}
                              </ul>
                            </div>
                    }
                
      
              
                   
   
                    
                </div>  
                </Route>
                <Route exact path="/addLocation">
                  <AddLocation/>
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
