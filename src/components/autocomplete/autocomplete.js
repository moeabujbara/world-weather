import React, { Component, useState } from "react";
import { coordinatesf } from "../../api/api.js";
import "./autocomplete.css";
import { useEffect, useRef } from "react";

const Autocomplete = (props) => {
  let [country_name, setcountry_name] = useState([]);
  let [data, setdata] = useState([]);

  const updateInputValue = async (evt) => {
    setcountry_name(evt.target.value);
    let response = await coordinatesf(country_name);
    setdata(response.data.results, data);
  };
  useEffect(() => {
    updateInputValue();
  }, []);

  const handleChange1 = (event) => {
    props.onChange(event.target.value);
    var x = document.getElementById("form-autocomplete").value;
    if (x == "")
      document.getElementById("list-container").style.visibility = "hidden";
    else document.getElementById("list-container").style.visibility = "visible";
  };
  const select = (props) => {
    document.getElementById("form-autocomplete").value = props;
    document.getElementById("list-container").style.visibility = "hidden";
  };

  const Global = (event) => {
    updateInputValue(event);
    handleChange1(event);
  };
  return (
    <div>
      <div className="search-container text-center mt-3">
        <input
          required
          value={props.value}
          type="search"
          placeholder="Country-Name"
          autoComplete="off"
          id="form-autocomplete"
          className="form-control mdb-autocomplete"
          onChange={Global}
        />
        <div className="list-container" id="list-container">
          {data.slice(0, 4).map((postion, index) => (
            <div onClick={() => select(postion.formatted)}>
              <li className="new-list">
                <small>{postion.formatted.substring(0, 15)}</small>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;
