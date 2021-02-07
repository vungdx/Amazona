import React from "react";
import PropTypes from "prop-types";

MessageBox.propTypes = {};

function MessageBox(props) {
  return <div className={`alert alert-${props.variant}`}>{props.children}</div>;
}

export default MessageBox;
