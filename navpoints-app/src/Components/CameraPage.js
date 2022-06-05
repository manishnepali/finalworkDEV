import { Fragment, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Camera } from 'react-cam';

function capture(imgSrc) {
  console.log(imgSrc);
}

export default function CameraPage() {
   
 const cam = useRef(null);
  return (
    <div className='cameraPage'>
      <Router>
            <Switch>
             
           
             <Route exact path="/camera">
  
      <Camera
        showFocus={true}
        front={false}
        capture={capture}
        ref={cam}
        width="80%"
        height="auto"
        focusWidth="80%"
        focusHeight="60%"
        btnColor="white"
      />
      <button onClick={img => cam.current.capture(img)}>Take image</button>

    </Route>

    </Switch>
    </Router>
    </div>
  );
};
