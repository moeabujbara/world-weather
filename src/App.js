import React, {Suspense} from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { weatherAPi,arabicWeatherApi } from "./api.js";
import { coordinatesf } from "./api.js";
import { autocompleteApi } from "./api.js";
import { useEffect, useState, useRef } from "react";
import Moment from "react-moment";
import Weatherforyourlocation from "./weatherforyourlocation";
import GoogleMapReact from "google-map-react";
import { lang } from "moment";
import MapContainer from "./viewmap.js";
import Autocomplete from "./autocomplete.js";
import blue from "../src/assets/blue.jpg";
import Filterbox from "./filterbox.js";
import Hourly from "./hourly";
import Daily from './daily.js';
import Weekly from './weekly.js';
import Ten from './ten-day.js';


function App(props) {
  let [temp, settemp] = useState([]);
  let [error, setError] = useState([]);
  let [weatherdata, setweatherdata] = useState([]);
  let [currentdate, setcurrentdate] = useState([]);
  let [bool, setbool] = useState(false);
  let [newarray, setnewarray] = useState([]);
  let [selected, setselected] = useState(true);
  let [ctemp, setctemp] = useState([]);
  let [key, setkey] = useState([]);
  let [check, setcheck] = useState(false);
  let [coordinates, setcoordinates] = useState([]);
  let [center, setcenter] = useState([]);
  let [input, setInput] = useState([]);
  let [exported, setexported] = useState([]);
  let [windspeed, setwindspeed] = useState([]);
  let [hourly,sethourly]=useState([]);
  let [filter,setfilter]=useState(false);

  const updateInputValue = () => {
    console.warn("exported data is goin to be", exported);
    setcheck(true);
    fetch(exported);
    setbool(true);
  };

  const toggleSelected = () => {
    if (selected) {
      weatherdata.slice(0, 6).forEach((element, i) => {
        let x = (element.temp.max - 30) / 2;
        let y = (element.temp.min - 30) / 2;
        document.getElementById("highTemp" + i).innerHTML =
          x.toPrecision(4) + "C";
        document.getElementById("lowTemp" + i).innerHTML =
          y.toPrecision(4) + "C";
        setselected(false);
      });
    } else {
      setselected(true);
      weatherdata.slice(0, 6).forEach((element, i) => {
        let x = element.temp.max;
        let y = element.temp.min;
        document.getElementById("highTemp" + i).innerHTML =
          x.toPrecision(4) + "F";
        document.getElementById("lowTemp" + i).innerHTML =
          y.toPrecision(4) + "F";
      });
    }
  };
  fetch = async (props) => {
    try {
      let response = await coordinatesf(props);
      setcenter(response.data.results[0].geometry, center);
      let weatherresponse = await arabicWeatherApi(
        response.data.results[0].geometry.lat,
        response.data.results[0].geometry.lng
      );
      setweatherdata(weatherresponse.data.daily, weatherdata);
      console.warn("weatherdata", weatherdata);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const handleChange = (newvalue) => {
    setexported(newvalue);
  };
  const handleChange_hourly=(newvalue)=>{
    sethourly(newvalue);
    setfilter(true);
    console.warn("hourly from app",hourly)
  }

  return (

    <div className="text-white text-center overflow-auto container">
   <Suspense fallback="loading">
   <h3 className="mt-2 font-weight-bold">Hello , select your city !</h3>
     </Suspense> 
     
      <div className="flex-right">
      <Filterbox value={props.value}
          onClick={handleChange_hourly}></Filterbox>
        <Autocomplete
          value={props.value}
          onChange={handleChange}
        ></Autocomplete>
        <br />
        {exported=="" ? (
           <button
           id="button"
           className="mt-2 btn btn-info rounded "
           size="md"
           onClick={updateInputValue}
           disabled
         >
           Check Weather
         </button>
        )
        :( <button
          id="button"
          className="mt-2 btn btn-info rounded "
          size="md"
          onClick={updateInputValue}
        >
          Check Weather
        </button>)
        }
       
        <br></br>
        {check && filter==false ? (
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <div className="mt-3" id="f">
              <MapContainer data={center}> </MapContainer>
            </div>
            <div
              id="toggle-container"
              className="mt-5 mt-md-0"
              onClick={toggleSelected}
            >
              <div
                className={`dialog-button mt-0 ${selected ? "" : "disabled"}`}
              >
                {selected ? "F" : "C"}
              </div>
            </div>
          </div>
        ) : null}
        <br />
    {hourly=='hourly-weather' && check==true  ?(<Hourly 
    hourdata={exported}
    >
    </Hourly>)
    :(null)}
    {hourly=='daily-weather' && check==true  ?(<Daily
    dailydata={exported}
    >
    </Daily>)
    :(null)}
    {hourly=='weekly-weather' && check==true  ?(<Weekly
    weeklydata={exported}
    ></Weekly>)
    :(null)}
    {hourly=='ten-days-weather' && check==true  ?(<Ten
    tendata={exported}
    >
    </Ten>)
    :(null)}
        {check==true && filter==false? (
          <div className="d-flex flex-wrap justify-content-center justify-content-lg-between mt-3 text-white font-weight-bold">
            {weatherdata.slice(0, 6).map((postion, index) => (
              <div id="card">
                <div className="row h-100">
                  <div className="col-6">
                    <ul className="list-inline">
                      {postion.weather[0].main == "Snow" ? (
                        <li>
                          {" "}
                          <img src="http://svgshare.com/i/1eq.svg" alt="" />
                          {postion.weather[0].main}
                        </li>
                      ) : null}

                      {postion.weather[0].main == "Rain" ? (
                        <li>
                          {" "}
                          <img src="http://svgshare.com/i/1eq.svg" alt="" />
                          {postion.weather[0].main}
                        </li>
                      ) : null}

                      {postion.weather[0].main == "Clouds" ? (
                        <li>
                          {" "}
                          <img src="http://svgshare.com/i/1eq.svg" alt="" />
                          {postion.weather[0].main}
                        </li>
                      ) : null}
                      {postion.weather[0].main == "Clear" ? (
                        <li>
                          {" "}
                          <img src="http://svgshare.com/i/1fu.svg" alt="" />
                          {postion.weather[0].main}
                        </li>
                      ) : null}
                    </ul>
                    <h6 id="tag">
                      {" "}
                      high:<span id={"highTemp" + index}>
                       {postion.temp.max} F
                      </span>
                    </h6>
                  </div>
                  <div className="col-6">
                    <div id="time">
                      <Moment unix format="D-MM-yyyy">
                        {postion.dt}
                      </Moment>
                    </div>

                    <p className="city mt-1 ml-3">{postion.dew_point}</p>
                    <div className="x">
                    low:<span id={"lowTemp" + index}>
                       {postion.temp.min} F
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ):(null)} 
        {check != true && filter==false ? (<Weatherforyourlocation/>):(null)}
      </div>
    </div>
   
  );
}

export default App;
