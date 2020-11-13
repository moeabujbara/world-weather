import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { weatherAPi } from "./api.js";
import { useEffect, useState } from "react";

function App() {
  let [city_name, setcity_name] = useState([]);
  let [error, setError] = useState([]);
  let [weatherdata, setweatherdata] = useState([]);
  let [bool, setbool] = useState("false");

  const updateInputValue = () => {
    var country = document.getElementById("city").value;
    setcity_name(country);
    fetch();
    console.warn("city name is; ", city_name);
    setbool(true);
  }
  
  const fetch = async () => {
    try {
      let response = await weatherAPi(city_name);
      setweatherdata(response.data.list, weatherdata);
      console.warn("response for data -->", response.data.list);
      console.warn("Array of weather-->", weatherdata);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="m-4 text-center">
      <h3>Hello , select your city !</h3>
      <div className="ml-4 flex-right">
        <input type="search" id="city"></input>
        <Button onClick={updateInputValue} className="ml-2" variant="primary">
          Weather Check
        </Button>
      </div>
    </div>
  )
}

export default App;
