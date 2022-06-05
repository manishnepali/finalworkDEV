import Start from "./Start";
import { useState, useEffect} from 'react';
import data from "../test.json"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MapBox from "./Mapbox";
  
export default function SelectPage() {
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
  }else if(bgColor == true){

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

const [bgColor, isBgColor] = useState(false);
    return (
        <div className="SelectPage">
            <Router>
            <Switch>
             
           
             <Route exact path="/explore">
            <div className='bg-backimg h-screen md:flex overflow-hidden'>

               
                <div className='container lg:ml-4 md:ml-4 resize-y bg-white box-border h-4/4 relative top-1/4 w-screen pb-36 rounded-t-2xl items-center' >
               
                <Link to="/">
                <svg class="w-16 h-16  dark:text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
                   </Link>
                     <h1 className="font-bold text-5xl ml-4">
                     In mood to:
                    </h1>
             
                    <ul className="grid grid-cols-2 max-h-60 mt-10 overflow-y-auto ml-4 mr-4">
                    
                      {data.map((category, index)=>{
                        return <li>
                          
                          <h1 className="text-4xl text-black font-bold mt-4 ml-4"
                           style={{backgroundColor: "#ffffff"}} 
                           onClick={changeColor} key={index}>{category.name} </h1> </li>
                      })}
                    </ul>
                    <Link to="/maps"><button class="bg-rose-600 w-2/3 ml-16 text-3xl text-white font-bold py-3 px-5 rounded-full mt-4 items-stretch ">
                  explore
                    </button></Link>
                    
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