import { useState, useEffect, useCallback} from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import data from './data/geoData.json';
import Nav from './Nav';
import Map, { Marker, 
  GeolocateControl,
   NavigationControl, 
   useMap,
   FullscreenControl,
   Source,
   Layer,
   Popup
} from 'react-map-gl';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
     arrayRemove,
    doc} from "../Backend/firebase"
import mapboxgl from 'mapbox-gl';
import AddLocation from './AddLocation';
import { map } from '@firebase/util';
import Login from './LogIn';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;




export default function MapBox() {


const loggedIn = localStorage.getItem("loggedIn")
const [showPage, setShowPage] = useState(Boolean(loggedIn));
const [getNav, setNav] = useState("2")


const username = localStorage.getItem("username");


  const[ mapsOption, setOption ] = useState("visible");

      const imgg = "https://cdn.iconscout.com/icon/free/png-256/bar-606-1106181.png";
        console.log(data)
      const geo = data.geometry;
          console.log(localStorage.getItem("username"));
      /* The above code is a callback function that is used to trigger the geolocate control. */
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

        //get data from firebase
        /**
         * It gets the data from the database and sets the state of the data
         */
        const getData = async() =>{
          const q = query(collection(db, "geo_location"));

          const querySnapshot = await getDocs(q);
          const dataSet = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }));
          setDataEvent(dataSet);
          // console.log(dataSet)
        } 
      


        /* The below code is using the useEffect hook to get the current location of the user and then
        set the state of the user's location. */
        useEffect(()=>{
          navigator.geolocation.getCurrentPosition(function(position) {
            setLattitude(position.coords.longitude);
            setLongituude(position.coords.latitude);
            setNavToPosition([position.coords.longitude, position.coords.latitude]);

            setViewport({
              longitude: position.coords.latitude,
              latitude: position.coords.longitude,
              zoom: 14
            })
          console.log("cor loc:", userLattitude, userLongitude, viewport, );
          }
          );        
          getData();
         
          console.log("location",dataEvent);
        },[])
  
        
      const [detailPage, setDetailPage] = useState(false);
      const [dq, setDq] = useState() ;
      const filterQuery = sessionStorage.getItem("filterQuery");
      console.log(filterQuery);


      /**
       * This function is called when a user clicks on a marker on the map. It takes the id of the
       * marker that was clicked on and stores it in a session storage variable. It then sets the
       * detail page to true, which causes the detail page to render. It also sets the map to fly to
       * the location of the marker that was clicked on
       * @param e - the event that triggered the function
       */
      function goToDetail(e){
        
        console.log(e.target.id)
        const toGetDetail = e.target.id;
        sessionStorage.setItem("detailQuery", toGetDetail);
        setDq(toGetDetail)
        setDetailPage(true)
        const latNow =  dataEvent[toGetDetail].geometry._lat;
        const longNow =  dataEvent[toGetDetail].geometry._long;
      
        setNavToPosition([longNow, latNow]);
        console.log(latNow, longNow);
       if(dataEvent[dq].likedBy == 'undefined' || !dataEvent[dq].likedBy.includes(username)){
        setLiked("none");
       }else if(dataEvent[dq].likedBy.includes(username)){
        setLiked("red");
       }
      
        // Map.flyTo(data[e.target.key].geometry.coordinates)
      }
      const [test, setTest] = useState(true);
   
      /**
       * This function is called when the user clicks the back button on the detail page. It sets the
       * detail page to false, the test page to false, the before like page to true, the layer to
       * false, the liked page to none, and the navigation to the user's position
       */
      function goBackToMap(){
      setDetailPage(false);
      setTest(false);
      setBeforeLike(true);
      setLayer(false);
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
      const apiKey="pk.eyJ1IjoibWFuaXNobmVwYWxpIiwiYSI6ImNsM2h4Y3J3cTFnOWQzZXByODNobTZmZHcifQ.S-NfRKjOs4vOaW8jZnOmRw"
      const [directions, setDirections] = useState([]);
      const [layer, setLayer] = useState(false)
      const [navToPosition, setNavToPosition] = useState([ userLattitude , userLongitude]);
       /**
        * The function takes the latitude and longitude of the event and the user's current location
        * and sends a request to the Mapbox API to get the directions from the user's current location
        * to the event
        */
       async function setWaypoint(){
        setTest(true)
        
        const lattDetail = dataEvent[dq].geometry._lat;
        const longDetail = dataEvent[dq].geometry._long;
        // setNavToPosition([longDetail, lattDetail])

         await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${userLattitude},${userLongitude};${longDetail},${lattDetail}?geometries=geojson&access_token=pk.eyJ1IjoibWFuaXNobmVwYWxpIiwiYSI6ImNsM2h4Y3J3cTFnOWQzZXByODNobTZmZHcifQ.S-NfRKjOs4vOaW8jZnOmRw`) 
         .then((res) => res.json()).catch((res)=>console.log(res.json())).then((res)=>setDirections(res) );
           console.log("d",directions);
          // setViewport({
          //   longitude: longDetail,
          //   latitude: lattDetail,
          //   zoom: 14
          // })
          setLayer(true)
          setNavToPosition([ userLattitude , userLongitude])
        }

        /**
         * It sets the layer to false so u retun to detail page
         */
        function backToWay(){
          setLayer(false);
        }


      /**
       * The function NavigateButton() is called when the maps is loaded in from mapbox. The function uses the
       * useMap() hook to get the current map object. The map object is then used to fly to the
       * navToPosition
       */
      function NavigateButton() {
        
        const {current: map} = useMap();
        
          map.flyTo({center: navToPosition, zoom: 19});
        
      }

      const [isLiked, setLiked] = useState("none");
      const [countLikes, setLikes] = useState(document.getElementById('currentLikes'));
      const [beforeLike, setBeforeLike] = useState(true)
     console.log(beforeLike)
     /**
      * The function checks if the user has liked the event before, if not, it adds one to the number
      * of likes and adds the user's username to the array of users who liked the event. If the user
      * has liked the event before, it removes one from the number of likes and removes the user's
      * username from the array of users who liked the event
      * @param e - the event that is triggered when the user clicks the like button
      */
      async function submit(e){   
        console.log("oldLikes",parseInt(countLikes)) 
        setLikes(document.getElementById('currentLikes'));
        const newLiked = parseInt(dataEvent[dq].likes);
        console.log(newLiked)

            if(isLiked == "none"){
              setLikes(newLiked+1);
              console.log(countLikes) 

              setLiked("red");
              setBeforeLike(false);
              const docRef = doc(db, "geo_location", dataEvent[dq].id);
              const payload = {likes : dataEvent[dq].likes + 1,
              likedBy: arrayUnion(username)}
              console.log(payload)
              await updateDoc(docRef, payload)
            
      
            }else if(isLiked == "red" && dataEvent[dq].likedBy.includes(username)){
              setLikes(countLikes-1); 
              console.log(countLikes) 
              setLiked("none");
              setBeforeLike(true);
              const docRef = doc(db, "geo_location", dataEvent[dq].id);
              const payload = {likes : dataEvent[dq].likes - 1,
              likedBy: arrayRemove(username)}
              console.log(payload)
              await updateDoc(docRef, payload)
            }
      }
      const [list, setList] = useState(true)
    /**
     * If the list is true, set it to false. If the list is false, set it to true, if false the user
     * gets full vieuw of the map
     */
    function toogleList(){
        if(list === true){
          setList(false)
        }else if(list === false){
          setList(true)
        }
    }
   
    const layerStyle =   {
      id: "routes",
      type: "line",
      paint: {"line-color": "red", 'line-width': 8}
  }
const[popup, setpopup] = useState(null)
  
      


  return (
    
    <div className='relative'>
 <Router>
            <Switch>
           
             <Route exact path="/maps">
             {showPage ? <div>
                
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
          >click to get the exact location</GeolocateControl>


        {dataEvent.map(event=>(
                    <Marker 
                    key={event.id}
                    longitude={event.geometry._long}
                      latitude={event.geometry._lat}
                      scale={2}
                      onClick={e=>{
                        
                      e.originalEvent.stopImmediatePropagation();
                    setpopup(event);
                    console.log(popup);
                      }}
                      
                      >
                       
                        <div
                        className="flex flex-col items-center w-20 h-20">
                        <img 
                                className='w-8 h-8 rounded-full bg-black'
                                src={event.eventIcon}></img>
                                
                        <h1 className='font-medium  text-l text-black '>{event.name}</h1>
                        
                   
                        </div>
                      </Marker>
                   
                ) )} 
                
              {popup && (<Popup longitude={popup.geometry._long} latitude={popup.geometry._lat}
                      anchor="bottom"
                      

                      onClose={()=>setpopup(null)}>
                      {popup.name}, {popup.description}
                    </Popup>)}
                
                <NavigateButton/>

                {layer?
                 <Source id="my-data" type="geojson" data={directions.routes[0].geometry}>
                 <Layer {...layerStyle} />
               </Source>: <></>
                }
               
       
          
        </Map>
    
        {list ?   <div
          id="eventContainer"
           className='z-20 container absolute bg-white box-border w-screen   rounded-t-2xl items-center top-2/4 mt-8' >
            
           
                    {
                      detailPage ? 
                      <div id="eventDetail">
                        
                   { layer ? <div
                   >
                    {/* <h1
                     className="fixed bottom-44  text-3xl
                     font-bold py-3 px-4 
                     
                       ">distance: {directions.routes[0].distance}</h1> */}
                    <button 
                    onClick={backToWay}
                          className="fixed bottom-32 bg-red-600  text-3xl
                          text-white font-bold py-3 px-4 rounded-lg w-2/4 left-1/4
                          
                            ">
                        go back
                          </button>
                   </div>:
                   <div>
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
                                  className="font-meduim w- text-xl my-4 mx-4 text-justify overflow-y-auto max-h-30
                                  md:max-w-md md:p-0">
                                    {dataEvent[dq].description}</p>
                                     </span>
                          <div id="detailContainer"
                            className='basis-0 grow  mx-2 text-center md:text-left md:flex md:flex-col md:justify-center md:items-center
                            '>
                                 
                                 
                              <span className='flex justify-around  w-full'>
                                  <p className='font-meduim 
                                  text-black text-lg p-4
                                  md:max-w-md md:p-0'>created by {dataEvent[dq].creator}</p>
                                  <button
                                  className=''
                                  onClick={submit}>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    className="h-14 w-14"
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
                              onClick={setWaypoint}
                              class="px-4 rounded-lg bg-red-600  
                              text-white text-xl font-bold p-4  my-4">
                                set waypoint
                                </button>
                                </div>
                                </div>}
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
                     
                            <span className=''>
                            <svg 
                            onClick={toogleList}
                            xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" viewBox="0 0 20 20" fill="red">
                              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                            </span>
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
                             <ul className='divide-y divide-gray-200 dark:divide-gray-700 h-96  my-4 overflow-auto '>
                              
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
                    
                </div>  : 
                <div>
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
                     
                            <span className=''>
                            <svg 
                            onClick={toogleList}
                            xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" viewBox="0 0 20 20" fill="red">
                            <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                          </svg>
                            </span>
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
                  </div>}
                  <Nav/>
                  </div>: <div>  <h1 className="font-bold text-5xl mx-4 mt-28">
                     Log in to explore areas around you
                     </h1>
                     
                     <Nav/></div>}
                </Route>
                <Route exact path="/addLocation">
                  <AddLocation/>
                </Route>
                
                <Route exact path="/explore">
                <SelectPage/>
                </Route>
               
                <Route exact path="/login">
                <Login/>
                </Route>
                </Switch>
                </Router>
    </div>
  
  );
}
