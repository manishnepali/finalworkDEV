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
               
                <Link to="/">
                <svg className="w-16 h-16 mx-8 mt-8  dark:text-rose-600" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="2" 
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z">
                    </path></svg>
                   </Link>
                   <svg xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 mx-8 mt-8dark:text-rose-600" 
                    fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" 
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
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