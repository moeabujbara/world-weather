import React from "react";
import { weatherAPi } from "./api.js";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { coordinatesf } from "./api.js";
import "./weekly.css"

const Weekly = (props) => {
  let [array, setarray] = useState([]);
  let [update, setupdate] = useState([]);
  let [error, setError] = useState([]);
  let [timezone, settimezone] = useState([]);
  let [selected, setselected] = useState(true);
  const toggleSelected = () => {
    if (selected) {
      array.slice(0,6).forEach((element, i) => {
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
      array.slice(0, 6).forEach((element, i) => {
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
      setupdate(props.weeklydata);
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
    setupdate(props.weeklydata);
  }, []);

  return (
    <div>
      <h5> <h4>Your Weekly Weather !</h4></h5>
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
      <div className="d-flex flex-wrap justify-content-between mt-3 text-white font-weight-bold text-center">
            {array.slice(0,6).map((postion, index) => (
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
                      <span id={"highTemp" + index}>
                        high:{postion.temp.max} F
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
                      <span id={"lowTemp" + index}>
                        low:{postion.temp.min} F
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

export default Weekly;