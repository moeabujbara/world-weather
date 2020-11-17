import axios from "axios";
export const weatherAPi = (lat,lon) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,hourly,alerts}&units=imperial&appid=8105173cbcf7061ec78298be0b0e309a`);
    
  };
  export const coordinates = (placename) => {
    return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${placename}&key=6ab50404c44048db898036968cfedc2f`);
    
  };
  
export default weatherAPi;  




