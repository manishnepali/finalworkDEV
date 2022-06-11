import Start from "./Start";
import { useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MapBox from "./Mapbox";
import Login from "../Backend/LogIn";
import {db, 
  collection,
   getDocs,
    where, 
    query, 
    setDoc,
     addDoc,
    doc} from "../Backend/firebase"
    import Select from 'react-select'
  
export default function SelectPage() {
  localStorage.setItem("mapsOption", false);
  const selectedList =[];
  const [isSelected , setSelected] = useState(false)
// selected[0] = prompt("test");
 const backimg = "https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670";
function changeColor(e){
  
  const objSel = e.target.innerText;
    console.log("obs:",objSel) 
  if(bgColor == false){
    e.target.style.backgroundColor = "#BF100080";
    isBgColor(true);
    setSelected(true);
   

   localStorage.setItem(selectedList, JSON.stringify(objSel));
  }else{

    e.target.style.backgroundColor = "#ffffff";
    isBgColor(false)
    if(isSelected == true){
      console.log("isSelected")
    }else{
      console.log("not selected")
    }

    
    localStorage.setItem(selectedList, JSON.stringify(objSel));
  }
 
  
// e.target.setBgColor("#BF100080");
}
const [data, setData] = useState([]);
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
const options = data.map((item, index)=>{
                return  [{
                  value: index,
                  label: item.name
                }]
                
              });
 
function getSeleectedCategory(e){
  const selected = e.target.value;
  console.log(selected);
  sessionStorage.setItem("filterQuery", selected);
}



useEffect(()=>{
  getData();
  console.log("event catagory",data);

},[])

const [bgColor, isBgColor] = useState(false);
    return (
        <div className="SelectPage">
            <Router>
            <Switch>
             
           
             <Route exact path="/explore">
            <div className='bg-backimg bg-center bg-cover h-screen md:flex overflow-hidden'>
              <img className ="fixed ml-40 top-0 p-4 w-28 h-28 "
              src="https://i.ibb.co/dKzS64v/navitlogo.png"/>
               
                <div className='container lg:ml-4 md:ml-4 resize-y bg-white box-border h-full relative top-1/4 w-screen pb-36 rounded-t-2xl items-center' >
                <div className='flex pl-4 pt-8 '>
                <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" 
                                  class="h-14 w-14" viewBox="0 0 20 20" 
                                  fill="#DC2625">
                              <path fill-rule="evenodd"
                               d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                                clip-rule="evenodd" />
                            </svg>
                   </Link>
                 </div>
                     <h1 className="font-bold text-5xl mt-4 ml-8">
                     In mood for:
                    </h1>
                   
             
                    <ul className="flex flex-wrap max-h-4/5 overflow-x-auto mx-4 mt-4">
                     {/* <Select 
                     className="text-4xl text-black font-bold mt-4 ml-4"
                    
                     options={options}/> */}
                      
                    
                      {data.map((category, index)=>{
                        return <li className="p-4">
                          <input 
                          onChange={getSeleectedCategory}
                          className="h-8 w-8 border border-gray-300 bg-white checked:bg-blue-600 
                          checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
                          type="radio" id={category.id} name="filter" value={category.name}/>
                          <label 
                          className="text-2xl text-black font-bold my-4 ml-4"
                          
                          for={category.id}>{category.name}</label>
                        
                          {/* <h1 className="text-4xl text-black font-bold my-4 ml-4"
                           style={{backgroundColor: "#ffffff"}} 
                           onClick={changeColor} key={index}>{category.name} </h1>
                      */}
                       </li>
                      })} 
                    </ul>
              <Link to="/maps">
                      <button 
                      
                      className="bg-red-600 w-2/3 ml-16 text-3xl text-white font-bold py-5 px-6 rounded-full mt-8 items-stretch ">
                  explore
                    </button>
                    </Link>
                </div>
                
            </div>       
            </Route>
             
           
                <Route exact path="/">
                <Start/>
                </Route>
                <Route exact path="/maps">
                <MapBox/>
                </Route>
               
            </Switch>
            </Router>
      </div>
    );
  }