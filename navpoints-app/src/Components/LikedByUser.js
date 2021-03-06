import { useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
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


export default function LikedByUser() {

 const userId = localStorage.getItem("userId");
 const username = localStorage.getItem("username")
 const [dataEvent, setDataEvent] = useState([]);
/**
 * The above function is an async function that gets the data from the database and sets the data to
 * the dataEvent state.
 */
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
 /* A hook that is used to perform side effects in function components. */
  useEffect(()=>{getData()},[]);
  
  
 

    return (
      <div id="likedByUser"  
      className='z-20 container  bg-white box-border w-full   rounded-b-2xl items-center' >
      
                               <ul className='divide-y divide-gray-200 dark:divide-gray-700  overflow-y-auto h-40'>  
                             {dataEvent.map((data,i)=>{
                                 if(data.likedBy && data.likedBy.includes(username))
                                return <li>
                                    <span className='flex flex-row pt-2  h-full justify-around align-baseline'>
                                    <img 
                                        
                                        className='w-14 h-14 rounded-full'
                                        src={data.eventIcon}></img>
                                       
                                   <h1
                                   className="font-bold  text-l text-black  w-3/6 ">{data.name}</h1> 
                                   

                                    </span>
                                    <p className='text-right font-bold text-xs'>{data.likes} times liked by explorers </p>
                                    </li>
                                    
                             })}</ul> 
        </div>
     
    );
  }
  
 