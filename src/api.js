import axios from "axios";
export const weatherAPi = (cityname) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=8105173cbcf7061ec78298be0b0e309a`);
    
  };
export default weatherAPi;  

