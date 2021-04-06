import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

OrderListScreen.propTypes = {};

function OrderListScreen(props) {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  useEffect(() => {
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, sellerMode, userInfo._id]);
  const deleteHandler = (order) => {};
  return (
    <div>
      <h1>Orders</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button type="button" className="small" onClick={() => deleteHandler(order)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderListScreen;
