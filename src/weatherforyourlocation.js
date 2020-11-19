import React from "react";
import { weatherAPi } from "./api.js";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import clear from "../src/assets/clear.png";
import cloudy from "../src/assets/cloudy.png";
import rain from "../src/assets/rain.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { render } from "react-dom";
import './weatherforyourlocation.css'

export default function Getloctiondata() {
  let [array, setarray] = useState([]);
  let [lat,setlat]=useState([]);
  let [lang,setlang]=useState([]);
  let [check, setcheck] = useState(false);
   
  if (check===false) {
    setcheck(true);
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      setlat(position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setlang(position.coords.longitude)
    });
  };
 

  const fetch = async () => {
    if (check) {
      let response = await weatherAPi(31.963158,35.930359);
      setarray(response.data.hourly, array);
      console.warn("your hourly data is going to be", response);
      
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div id="mainCard" className="p-2 pl-5 justify-content-between card d-flex flex-row  mx-auto " style={{width:50+'rem'}}>
      {array.slice(0, 5).map((postion, index) => (
        <div key={index} className="mr-5">
          <div className="card-title">
            {postion.weather[0].main =="Rain" ? (
              <div variant="top" src={rain} />
            ) : null}{" "}

          {postion.weather[0].main == "Clouds" ? (
              <div variant="top" src={cloudy}/>
            ) : null}{" "}

          {postion.weather[0].main == "Clear" ? (
              <Card.Img variant="top" src={clear}/>
            ) : null}{" "}
          </div>

        
          <div className="card-text text-black">{postion.weather[0].main}</div>

          <div className="card-text">
            <h6 className="text-black">
              <Moment format="hh:mm:ss a">{postion.sunset}</Moment>
            </h6>
          </div>

          <br />
          <div className="card-text text-black">
            <h6>
              high: <span id={"highTemp" + index}>{postion.temp} F</span>
            </h6>
          </div>
          </div>
      ))}
    </div>
  );
}
