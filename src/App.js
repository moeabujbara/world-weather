import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { weatherAPi } from "./api.js";
import { useEffect, useState } from "react";
import Moment from "react-moment";
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
    <div className=" text-center">
      <h3 className="mt-3 font-weight-bold">Hello , select your city !</h3>
      <div className="ml-4  flex-right">
        <input type="search" id="city"></input>
        <br />
        <Button
          onClick={updateInputValue}
          className="mt-2"
          variant="primary"
          size="sm"
        >
          Check Weather
        </Button>

        <br />
        <div className="mt-5 d-flex justify-content-around">
          {weatherdata.slice(0, 5).map((postion, index) => (
            <Card key={index} style={{ width: "12rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title> {postion.weather[0].main}</Card.Title>
                <Card.Text>
                  <Moment format="yy-MM-d">
                    <h6>{postion.dt_txt} </h6>
                  </Moment>
                  <h6>Max: {postion.main.temp_max}</h6>
                  <h6>Min: {postion.main.temp_min}</h6>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
