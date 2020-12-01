import React from "react";

function Header(props) {
  let content = {
    English: {
      description: "Hello , select your city !",
    },
    Arabic: {
      description: "!مرحبًا،حدد مدينتك",
    },
  };

  props.language === "Arabic"
    ? (content = content.Arabic)
    : (content = content.English);

  return (
    <div>
      <h3>{content.description}</h3>
    </div>
  );
}

export default Header;
