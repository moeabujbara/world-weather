import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { weatherAPi,coordinates } from "./api.js";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import clear from "../src/assets/clear.png";
import cloudy from "../src/assets/cloudy.png";
import rain from "../src/assets/rain.png";

let element;
function App() {
  let [city_name, setcity_name] = useState([]);
  let [temp, settemp] = useState([]);
  let [error, setError] = useState([]);
  let [weatherdata, setweatherdata] = useState([]);
  let [lat, setlat] = useState([]);
  let [lon, setlon] = useState([]);
  let [Geographical,setGeographical]=useState([]);
  let [bool, setbool] = useState("false");

  const updateInputValue = () => {
    var country = document.getElementById("city").value;
    setcity_name(country);
    fetch(country);
    console.warn("city name is; ", city_name);
    setbool(true);
  };

  const fetch = async (props) => {
    try {
      let response = await coordinates(props);
      setGeographical(response.data.results[0].geometry, Geographical);
      console.warn("response for data -->", response.data.results[0].geometry);
      console.warn("Geographical-->", Geographical.lat);
      console.warn("Geographical-->", Geographical.lng);
      let weatherresponse = await weatherAPi(Geographical.lat,Geographical.lng);
      setweatherdata(weatherresponse.data, weatherdata);
      console.warn("weatherdata",weatherresponse.data)
      console.warn("weatherdata",weatherdata);

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
      <div className="m-0">
      </div>
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

        <br />

      </div>
    </div>
  );
}

export default App;
