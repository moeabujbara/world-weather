import React from "react";
import { weatherAPi } from "./api.js";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import clear from "../src/assets/clear.png";
import cloudy from "../src/assets/cloudy.png";
import rain from "../src/assets/rain.png";
import snow from "../src/assets/snowy.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { render } from "react-dom";
import "./weatherforyourlocation.css";

export default function Getloctiondata() {
  let [array, setarray] = useState([]);
  let [lat, setlat] = useState([]);
  let [lang, setlang] = useState([]);
  let [check, setcheck] = useState(false);
  let [selected, setselected] = useState(true);

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
      <div id="toggle-container" onClick={toggleSelected}>
        <div className={`dialog-button ${selected ? "" : "disabled"}`}>
          {selected ? "F" : "C"}
        </div>
      </div>
      <div
        id="mainCard"
        className="mt-3 p-5 card d-flex justify-content-between flex-wrap flex-row  mx-auto text-black font-weight-bold"
      >
        {array.slice(0, 5).map((postion, index) => (
          <div className="mx-auto mb-3 mb-md-0"  style={{ width: "12rem" }} key={index}>
            <div className="card-title">
              {postion.weather[0].main == "Snow" ? (
                <Card.Img variant="top" src={snow} />
              ) : null}
              {postion.weather[0].main == "Rain" ? (
                <Card.Img variant="top" src={rain} />
              ) : null}
              {postion.weather[0].main == "Clouds" ? (
                <Card.Img variant="top" src={cloudy} />
              ) : null}
              {postion.weather[0].main == "Clear" ? (
                <Card.Img variant="top" src={clear} />
              ) : null}
            </div>
            <div className="card-text">
              {postion.weather[0].main}
            </div>
            <div className="card-text mt-3 font-weight-bold">
              <h6 className="font-weight-bold">
                <Moment unix format="hh:mm">
                  {postion.dt}
                </Moment>
              </h6>
              </div>
            <br />
            <div className="card-text">
              <h6 className="font-weight-bold">
                high: <span id={"highTemp" + index}>{postion.temp} F</span>
              </h6>
            </div>
             <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
}
