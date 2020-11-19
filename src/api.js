import axios from "axios";
export const weatherAPi = (lat,lon) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,alerts}&units=imperial&appid=9ef82b487aa3f82c87969a56bd3ae31c`);
    
  };
  export const coordinates = (props) => {
    return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${props}&key=6ab50404c44048db898036968cfedc2f`);
    
  };
 
  
export default weatherAPi;  




