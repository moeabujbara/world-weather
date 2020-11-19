import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { weatherAPi, coordinates, weatherAPitemp } from "./api.js";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import clear from "../src/assets/clear.png";
import cloudy from "../src/assets/cloudy.png";
import rain from "../src/assets/rain.png";
import Weatherforyourlocation from "./weatherforyourlocation";
let element;
function App() {
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
  const fetch = async (props) => {
    try {
      let response = await coordinates(props);
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

  return (
    <div className="p-3 mb-2 bg-info text-white text-center">
      <h3 className="mt-3 font-weight-bold">Hello , select your city !</h3>
      <div className="m-0"></div>
      <div className="ml-4  flex-right">
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
        <div className="" id="toggle-container" onClick={toggleSelected}>
          <div className={`dialog-button ${selected ? "" : "disabled"}`}>
            {selected ? "F" : "C"}
          </div>
        </div>
        <br />
        {check ? (
          <div
            className="mt-5 d-flex flex-wrap justify-content-around"
            id="main"
          >
            {weatherdata.slice(0, 5).map((postion, index) => (
              <Card.Header
                id={"weather-card"}
                style="background-color:black"
                key={index}
                style={{ width: "12rem" }}
              >
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
                      <Moment>{postion.td}</Moment>
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
