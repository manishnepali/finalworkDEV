import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import data from './data/profile.json';



function Journal() {
  const profile = "https://i.ibb.co/8KypTMS/wxnish.png"
    return (
      <div id="journal"
      className="flex">
           <Router>
            <Switch>
             
           
             <Route exact path="/journal">
             <p>journal</p>
              
              <div id="background_journal" 
              class=" z-10 absolute top-0 w-full h-full bg-center bg-cover bg-backimg" >
                  <div id="container_info_j"
                  className="container mt-24 w-4/5 h-2/5 bg-white p-4 
                  lg:order-2 flex-col justify-center ml-12 top-2/4
                  rounded-lg">
                    <img src={profile}
                    className="w-24 h-24 rounded-full"/>
                    <p>info</p>
                    <ul>
                   
                       <li className='py-8 sm:py-8 flex-col space-x-8 ml-4'>
                        <h1 className="font-bold truncate text-xl text-black mt-4 ml-4 "
                      > {data.name} </h1>
                        <h1 className="font-bold truncate text-xl text-black mt-4 ml-4 "
                       >{data.status} </h1>
                        
                          </li>
                  
                    </ul>
             </div>
             </div>
            
             
              
             </Route>
       </Switch>
       </Router>
    
      </div>
    );
  }
  
  export default Journal;
  