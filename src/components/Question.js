import React from "react";

function Question(props) {
  return (
    <React.Fragment>
      <h3>{props.question}</h3>
      <button onClick={props.function}>Yes</button>
    </React.Fragment>
  );
}

export default Question;
