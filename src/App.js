import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { weatherAPi } from "./api.js";
import { useEffect, useState } from "react";
import Moment from 'react-moment';
let element;
function App() {
  let [city_name, setcity_name] = useState([]);
  let [temp, settemp] = useState([]);
  let [error, setError] = useState([]);
  let [weatherdata, setweatherdata] = useState([]);
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
      let response = await weatherAPi(props);
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
    <div classNameName="m-4 text-center">
      <h3>Hello , select your city !</h3>
      <div classNameName="ml-4 flex-right">
        <input type="search" id="city"></input>
        <Button
          onClick={updateInputValue}
          classNameName="ml-2"
          variant="primary"
        >
          Weather Check
        </Button>

        {weatherdata.slice(0, 5).map((postion, index) => (
          <div className=" mt-5 container" key={index}>
            <div className="row">
              <div className="col-sm">
                <h3>{postion.main.temp}</h3>
                <h3>{postion.dt_txt}</h3>
                <h3>{postion.main.temp_max}</h3>
                <h3>{postion.main.temp_min}</h3>
                
              </div>
              <div className="col-sm">One of three columns</div>
              <div className="col-sm">One of three columns</div>
              <div className="col-sm">One of three columns</div>
              <div className="col-sm">One of three columns</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
