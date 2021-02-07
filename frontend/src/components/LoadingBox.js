import React from "react";
import PropTypes from "prop-types";

LoadingBox.propTypes = {};

function LoadingBox(props) {
  return (
    <div>
      <i className="fa fa-spinner fa-spin"></i> Loading...
    </div>
  );
}

export default LoadingBox;
