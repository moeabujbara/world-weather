import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { weatherAPi} from "./api.js";
import {coordinatesf} from "./api.js";
import { useEffect, useState ,useRef } from "react";
import Moment from "react-moment";
import clear from "../src/assets/clear.png";
import cloudy from "../src/assets/cloudy.png";
import rain from "../src/assets/rain.png";
import Weatherforyourlocation from "./weatherforyourlocation";
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { lang } from "moment";
import MapContainer from './viewmap.js';
import snow from "../src/assets/snowy.png";

let element;
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
  let [center,setcenter]=useState([]);
  
  
  const updateInputValue = () => {
    setcheck(true);
    var country = document.getElementById("city").value;
    fetch(country);
    setbool(true);
  };
  const toggleSelected = () => {
    if (selected) {
      weatherdata.slice(0, 5).forEach((element, i) => {
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
      weatherdata.slice(0, 5).forEach((element, i) => {
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
       try{
      let response = await coordinatesf(props);
      setcenter(response.data.results[0].geometry,center);
      let weatherresponse = await weatherAPi(
        response.data.results[0].geometry.lat,
        response.data.results[0].geometry.lng
      );
      setweatherdata(weatherresponse.data.daily, weatherdata);
      console.warn("orginal",weatherresponse.data)
      console.warn("weatherdatadat",weatherdata)}
      catch (error) {
        setError(error.message);
      }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className=" mb-2 bg-info text-white text-center position:relative overflow-auto">
      <h3 className="mt-3 font-weight-bold">Hello , select your city !</h3>
      <div className="flex-right">
        <input
          type="text"
          id="city"
          className="px-10 py-10 shadow-lg bg-grey rounded"
          placeholder="Search"
        />
        <br />
        <Button
          onClick={updateInputValue}
          className="mt-2 btn btn-warning rounded"
          size="md"
        >
          Check Weather
        </Button>
     
       {check ?(
         <div className="d-flex flex-column flex-md-row justify-content-between">
           <div id="f">
           <MapContainer  data={center}> </MapContainer>
           </div>
         <div id="toggle-container" className="mt-5 mt-md-0" onClick={toggleSelected}>
         <div className={`dialog-button mt-0 ${selected ? "" : "disabled"}`}>
           {selected ? "F" : "C"}
         </div>
       </div>
       </div>
       ):
        (null)
      }
       <br />
          {check ? (
          <div
            className="mt-5 d-flex flex-wrap justify-content-around flex-row mx-auto"
            id="main"
          >
            
            {weatherdata.slice(0, 5).map((postion, index) => (
              <Card.Header
                id={"weather-card"}
                style="background-color:black"
                key={index}
                style={{ width: "12rem" }}
                className="mx-auto mb-3"
              >
                <div>
                {postion.weather[0].main =="Snow" ? (
                <Card.Img variant="top" src={snow} />
              ) : null}
              </div>
              <div>
                  {postion.weather[0].main === "Rain" ? (
                    <Card.Img variant="top" src={rain} />
                  ) : null}{" "}
                </div>
                <div>
                  {postion.weather[0].main === "Clouds" ? (
                    <Card.Img variant="top" src={cloudy} />
                  ) : null}{" "}
                </div>
                <div>
                  {postion.weather[0].main === "Clear" ? (
                    <Card.Img variant="top" src={clear} />
                  ) : null}{" "}
                </div>

                <Card.Body>
                  <Card.Title className="font-weight-bold">
                    {postion.weather[0].main}
                  </Card.Title>
                  <Card.Text>
                    <h6>
                  <Moment unix format="D-MM-yyyy">{postion.dt}</Moment>
                    </h6>
                    <br />
                    <h6>
                      high:{" "}
                      <span id={"highTemp" + index}>{postion.temp.max} F</span>
                    </h6>
                    <h6>
                      low:{" "}
                      <span id={"lowTemp" + index}>{postion.temp.min} F</span>
                    </h6>
                  </Card.Text>
                </Card.Body>
              </Card.Header>
            ))}

          </div>
        ) : (
          <Weatherforyourlocation />
        )}
      </div>
    </div>
  );
}

export default App;
