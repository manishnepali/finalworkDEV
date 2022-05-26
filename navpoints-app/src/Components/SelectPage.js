import Start from "./Start";
import { useState, useEffect} from 'react';
import data from "../test.json"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
export default function SelectPage() {
 const backimg = "https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670";
function changeColor(e){
e.target.setBgColor("#BF100080");
}

const [bgColor, setBgColor] = useState();
    return (
        <div className="SelectPage">
            <Router>
            <Switch>
             
           
             <Route exact path="/explore">
            <div className='bg-backimg h-screen overflow-hidden'>

               
                <div className='container bg-white box-border h-3/4 relative top-1/4 w-screen  rounded-t-2xl items-center' >
                <ul className='flex flex-col justify-center  p-4 mx-auto'>
                <Link to="/"><button class="bg-rose-600 w-2/6 text-l text-white font-bold py-3 px-5 rounded-full mt-4 items-stretch ">
                  go back
                    </button></Link>
                     <h1 className="font-bold text-5xl">
                     In mood to:
                    </h1>
             
                    <ul className="grid grid-cols-2  mt-10 overflow-auto">
                      {data.map((category, index)=>{
                        return <li>
                          <h1 className="text-4xl text-black font-bold"
                           style={{backgroundColor: bgColor}} 
                           onClick={changeColor} key={index}>{category.name} </h1> </li>
                      })}
                    
                      
                    </ul>
                    </ul>
   
                    
                </div>
                
            </div>       
            </Route>
             
           
                <Route exact path="/">
                <Start/>
                </Route>
            </Switch>
            </Router>
      </div>
    );
  }