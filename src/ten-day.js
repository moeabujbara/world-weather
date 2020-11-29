import React from "react";
import { weatherAPi } from "./api.js";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { coordinatesf } from "./api.js";
import "./weekly.css"
import snow from './assets/snow.svg';
import rain from './assets/rain.svg';
import cloud from './assets/clouds.svg';
import clear from './assets/clear.svg';

const TenDays = (props) => {
  let [array, setarray] = useState([]);
  let [update, setupdate] = useState([]);
  let [error, setError] = useState([]);
  let [timezone, settimezone] = useState([]);
  let [selected, setselected] = useState(true);
  const toggleSelected = () => {
    if (selected) {
      array.slice(0,9).forEach((element, i) => {
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
      array.slice(0, 9).forEach((element, i) => {
        let x = element.temp.max;
        let y = element.temp.min;
        document.getElementById("highTemp" + i).innerHTML =
          x.toPrecision(4) + "F";
          document.getElementById("lowTemp" + i).innerHTML =
          y.toPrecision(4) + "F";
      });
    }
  };

  fetch = async () => {
      setupdate(props.tendata);
      let response = await coordinatesf(update);
      let weatherresponse = await weatherAPi(
        response.data.results[0].geometry.lat,
        response.data.results[0].geometry.lng
      );
      setarray(weatherresponse.data.daily, array);
      settimezone(weatherresponse.data.timezone, timezone);
     
  };
  useEffect(() => {
    fetch();
    setupdate(props.tendata);
  }, []);

  return (
    <div>
      <h5> <h4>Your ten-days Weather !</h4></h5>
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
      <div className="d-flex flex-wrap justify-content-center justify-content-lg-between mt-3 text-white font-weight-bold text-center">
            {array.slice(0,9).map((postion, index) => (
              <div id="card">
                <div className="row h-100">
                  <div className="col-6">
                    <ul className="list-inline">
                      {postion.weather[0].main == "Snow" ? (
                        <li>
                          {" "}
                          <img src={snow} alt="" />
                          {postion.weather[0].main}
                        </li>
                      ) : null}

                      {postion.weather[0].main == "Rain" ? (
                        <li>
                          {" "}
                          <img src={rain} alt="" />
                          {postion.weather[0].main}
                        </li>
                      ) : null}

                      {postion.weather[0].main == "Clouds" ? (
                        <li>
                          {" "}
                          <img src={cloud} alt="" />
                          {postion.weather[0].main}
                        </li>
                      ) : null}
                      {postion.weather[0].main == "Clear" ? (
                        <li>
                          {" "}
                          <img src={clear} alt="" />
                          {postion.weather[0].main}
                        </li>
                      ) : null}
                    </ul>
                    <h6 className="font-weight-bold" id="tag">
                      {" "}
                      high: <span id={"highTemp" + index}>
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

                    <p className="city mt-1 ml-3">{timezone}</p>
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
  </div>
  );
};

export default TenDays;