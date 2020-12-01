import React from "react";

function Button(props) {
  let content = {
    English: {
      checkbox: "Check Weather",
    },
    Arabic: {
      checkbox: "تحقق من الطقس",
    },
  };

  props.language === "Arabic"
    ? (content = content.Arabic)
    : (content = content.English);

  return (
    <div>
      <h5>{content.checkbox}</h5>
    </div>
  );
}

export default Button;
