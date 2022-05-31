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
 const backimg = "https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670";
function changeColor(e){
  if(bgColor == false){
    e.target.style.backgroundColor = "#BF100080";
    isBgColor(true);
  }else if(bgColor == true){

    e.target.style.backgroundColor = "#ffffff";
    isBgColor(false)
  }
 
  
// e.target.setBgColor("#BF100080");
}

const [bgColor, isBgColor] = useState(false);
    return (
        <div className="SelectPage">
            <Router>
            <Switch>
             
           
             <Route exact path="/explore">
            <div className='bg-backimg h-screen'>

               
                <div className='container bg-white box-border h-4/4 relative top-1/4 w-screen pb-36 rounded-t-2xl items-center' >
               
                <Link to="/"><button class="bg-rose-600 w-2/6 text-l text-white font-bold py-3 px-5 rounded-full mt-4 items-stretch ">
                  go back
                    </button></Link>
                     <h1 className="font-bold text-5xl">
                     In mood to:
                    </h1>
             
                    <ul className="grid grid-cols-2 max-h-80 mt-10 overflow-y-auto ">
                    
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