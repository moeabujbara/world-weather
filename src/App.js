import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Card  from 'react-bootstrap/Card';
import  Button  from 'react-bootstrap/Button';
import  {weatherAPi} from './api.js'
import {useEffect, useState } from "react";
 
function App(props) {
  let [city_name, setcity_name] = useState(null);
  let [weatherdata, setweatherdata] = useState(null);
  let [error, setError] = useState(null);

  const updateInputValue = () => {
    var country=document.getElementById("input").value;
    setcity_name(country);
    console.warn("city name is ",city_name);
   }

  const fetchPlayistDetails = async () => {
    try {
      let response = await weatherAPi(city_name);
      setweatherdata(response.data.weatherdata);
      console.warn("Here you go -->",weatherdata);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchPlayistDetails();
  }, []);
  return (
<div className="m-4 text-center">
  <h3>Hello , select your city !</h3>
  <div className="ml-4 flex-right">
  <input type="search"
  ></input>
  <Button onClick={updateInputValue} 
  className="ml-2" variant="primary">Weather Check</Button>
  </div>
  <Card className="mt-5 ml-5 text-center" style={{ width: '10rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>London</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>
  
  

</div>
  );
}

export default App;
