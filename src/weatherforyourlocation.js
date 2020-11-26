import React from "react";
import { weatherAPi } from "./api.js";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { render } from "react-dom";
import "./weatherforyourlocation.css";
import blue from "../src/assets/download.jpeg";


export default function Getloctiondata() {
  let [array, setarray] = useState([]);
  let [lat, setlat] = useState([]);
  let [lang, setlang] = useState([]);
  let [check, setcheck] = useState(false);
  let [selected, setselected] = useState(true);
  let [timezone, settimezone] = useState([]);

  if (!check) {
    setcheck(true);
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      fetch(position.coords.latitude, position.coords.longitude);
    });
  }

  const fetch = async (lat, lng) => {
    let response = await weatherAPi(lat, lng);
    setarray(response.data.hourly, array);
    settimezone(response.data.timezone, timezone);
    console.warn("your hourly data is going to be", response);
  };
  useEffect(() => {
    fetch();
  }, []);
  const toggleSelected = () => {
    if (selected) {
      array.slice(0, 5).forEach((element, i) => {
        let x = (element.temp - 30) / 2;
        document.getElementById("highTemp" + i).innerHTML =
          x.toPrecision(4) + "C";
        setselected(false);
      });
    } else {
      setselected(true);
      array.slice(0, 5).forEach((element, i) => {
        let x = element.temp;
        document.getElementById("highTemp" + i).innerHTML =
          x.toPrecision(4) + "F";
      });
    }
  };

  return (
    <div>
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
      <div className="d-flex flex-wrap justify-content-between mt-3 text-white font-weight-bold ">
        {array.slice(0, 6).map((postion, index) => (
          <div
            id="card"
            className=""
          >
            <div className="row h-100 ">
            <div className="col-6">
              <ul className="list-inline ">
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
              <h6>
                {" "}
                h: <span id={"highTemp" + index}>{postion.temp} F</span>
              </h6>

            </div>
            <div className="col-6">

              <div id="time">
                <Moment unix format="hh:mm">
                  {postion.dt}
                </Moment>
              </div>

              <p className="city mt-1 ml-3">{timezone}</p>

              <div className="x">Wind/s {postion.wind_speed}</div>
            </div>
          
              </div>
            
          
          </div>
        ))}
      </div>
      </div>
  );
}
