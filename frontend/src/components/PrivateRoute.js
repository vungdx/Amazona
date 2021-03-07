import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

PrivateRoute.propTypes = {};

function PrivateRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return <Route {...rest} render={(props) => (userInfo ? <Component {...props}></Component> : <Redirect to="/signin"></Redirect>)}></Route>;
}

export default PrivateRoute;
