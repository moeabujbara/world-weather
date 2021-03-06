import React from "react";
import "./App.css";
import { weatherAPi } from "./api/api.js";
import { coordinatesf } from "./api/api.js";
import { autocompleteApi } from "./api/api.js";
import { useEffect, useState, useRef } from "react";
import Moment from "react-moment";
import Weatherforyourlocation from "./components/currentloactionweather/weatherforyourlocation.js";
import GoogleMapReact from "google-map-react";
import { lang } from "moment";
import MapContainer from "./components/Map/viewmap.js";
import Autocomplete from "./components/autocomplete/autocomplete.js";
import Filterbox from "./components/filterbox/filterbox.js";
import Hourly from "./components/filtersoptions/hourly/hourly.js";
import Daily from "./components/filtersoptions/daily/daily.js";
import Weekly from "./components/filtersoptions/weekly/weekly.js";
import Ten from "./components/filtersoptions/ten-days/ten-day.js";
import snow from "./assets/snow.svg";
import rain from "./assets/rain.svg";
import cloud from "./assets/clouds.svg";
import clear from "./assets/clear.svg";
import Header from "./components/translate/header.js";
import Box from "./components/translate/button.js";

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
  let [hourly, sethourly] = useState([]);
  let [filter, setfilter] = useState(false);
  let languageStoredInLocalStorage = localStorage.getItem("language");
  let [language, setLanguage] = useState(
    languageStoredInLocalStorage ? languageStoredInLocalStorage : "English"
  );

  const updateInputValue = () => {
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
        let weatherresponse = await weatherAPi(
          response.data.results[0].geometry.lat,
          response.data.results[0].geometry.lng
        );
        setweatherdata(weatherresponse.data.daily, weatherdata);
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
  const handleChange_hourly = (newvalue) => {
    sethourly(newvalue);
    setfilter(true);
  };
  const storeLanguageInLocalStorage = (language) => {
    localStorage.setItem("language", language);
  };

  const handleSetLanguage = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="text-white text-center overflow-auto container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
          <a class="navbar-brand" href="#">
            Weather
          </a>
          <div className="language-select">
            <select
              className="custom-select"
              value={props.language}
              onChange={handleSetLanguage}
            >
              <option value="English">English</option>
              <option value="Arabic">العربية</option>
            </select>
          </div>
        </div>
      </nav>
      <h3 className="mt-5 font-weight-bold">
        <Header language={language} />
      </h3>

      <div className="flex-right">
        <Filterbox
          value={props.value}
          language={props.language}
          onClick={handleChange_hourly}
        ></Filterbox>
        <Autocomplete
          value={props.value}
          onChange={handleChange}
        ></Autocomplete>
        <br />
        {exported == "" ? (
          <button
            id="button"
            className="mt-2 btn btn-info rounded "
            size="md"
            onClick={updateInputValue}
            disabled
          >
            <Box language={language} />
          </button>
        ) : (
          <button
            id="button"
            className="mt-2 btn btn-info rounded "
            size="md"
            onClick={updateInputValue}
          >
            <Box language={language} />
          </button>
        )}

        <br></br>
        {check && filter == false ? (
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
        {hourly == "hourly-weather" && check == true ? (
          <Hourly hourdata={exported}></Hourly>
        ) : null}
        {hourly == "daily-weather" && check == true ? (
          <Daily dailydata={exported}></Daily>
        ) : null}
        {hourly == "weekly-weather" && check == true ? (
          <Weekly weeklydata={exported}></Weekly>
        ) : null}
        {hourly == "ten-days-weather" && check == true ? (
          <Ten tendata={exported}></Ten>
        ) : null}
        {check == true && filter == false ? (
          <div className="d-flex flex-wrap justify-content-center justify-content-lg-between mt-3 text-white font-weight-bold">
            {weatherdata.slice(0, 6).map((postion, index) => (
              <div id="card">
                <div className="row h-100">
                  <div className="col-6">
                    <ul className="list-inline">
                      {postion.weather[0].main == "Snow" ? (
                        <li>
                          {" "}
                          <img src={snow} />
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
                    <h6 id="tag">
                      {" "}
                      high:
                      <span id={"highTemp" + index}>{postion.temp.max} F</span>
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
                      low:
                      <span id={"lowTemp" + index}>{postion.temp.min} F</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {check != true && filter == false ? <Weatherforyourlocation /> : null}
      </div>
    </div>
  );
}

export default App;
