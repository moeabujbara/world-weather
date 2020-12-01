import React from "react";
import { useState, useEffect, useRef } from "react";
import "./filterbox.css";
import { Router, Link } from "react-router-dom";

const FilterBox = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange_hourly = (event) => {
    props.onClick(event.target.value);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-warning dropdown-toggle"
        type="button"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Filters
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button
          value={"hourly-weather"}
          onClick={handleChange_hourly}
          className="dropdown-item"
          type="button"
        >
          hourly-weather
        </button>
        <button
          value={"daily-weather"}
          onClick={handleChange_hourly}
          className="dropdown-item"
          type="button"
        >
          daily-weather
        </button>
        <button
          value={"weekly-weather"}
          onClick={handleChange_hourly}
          className="dropdown-item"
          type="button"
        >
          weekly-weather
        </button>
        <button
          value={"ten-days-weather"}
          onClick={handleChange_hourly}
          className="dropdown-item"
          type="button"
        >
          ten-days-weather
        </button>
      </div>
    </div>
  );
};
export default FilterBox;
