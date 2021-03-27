import React from "react";

MessageBox.propTypes = {};

function MessageBox(props) {
  console.log("props", props);
  return <div className={`alert alert-${props.variant}`}>{props.children}</div>;
}

export default MessageBox;
