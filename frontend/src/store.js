import thunk from "redux-thunk";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { productListReducer, productDetailsReducer, productCreateReducer, productUpdateReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer, userUpdateReducer } from "./reducers/userReducers";
import { orderCreateReducer, orderDetailsReducer, orderListReducer } from "./reducers/orderReducers";
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {},
    paymentMethod: "PayPal",
  },
  userSignin: {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
