import axios from "axios";
export const weatherAPi = (lat,lon) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,alerts}&units=imperial&appid=3e6c02adede40052e8a024a75e679447`);
    
  };
  export const coordinatesf = (props) => {
    return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${props}&key=6ab50404c44048db898036968cfedc2f`);
  };
  export const arabicWeatherApi =(lat,lon)=>{
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ar&exclude={current,minutely,alerts}&units=imperial&appid=3e6c02adede40052e8a024a75e679447`)
  }



