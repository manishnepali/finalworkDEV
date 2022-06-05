import MapBox from './Components/Mapbox';
import Start from './Components/Start'
import './App.css';
import Nav from './Components/Nav';
import Slider from './Components/Slider';
function App() {
  return (
    <div className="App">
  <Start/>
     {/* <MapBox/>
    <Slider/>*/}
     <Nav/>  
    </div>
  );
}

export default App;
