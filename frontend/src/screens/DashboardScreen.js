// import React from "react";
// import PropTypes from "prop-types";
// import LoadingBox from "../components/LoadingBox";
// import MessageBox from "../components/MessageBox";

// DashboardScreen.propTypes = {};

// function DashboardScreen(props) {
//   return (
//     <div>
//       <div className="row">
//         <h1>Dashboard</h1>
//       </div>
//       {loading ? (
//         <LoadingBox></LoadingBox>
//       ) : error ? (
//         <MessageBox variant="danger">{error}</MessageBox>
//       ) : (
//         <>
//           <ul className="row summary">
//             <li>
//               <div className="summary-title color1">
//                 <span>
//                   <i className="fa fa-users" />
//                   Users
//                 </span>
//               </div>
//               <div className="summary-body">{summary.users[0].numUsers}</div>
//             </li>
//             <li>
//               <div className="summary-title color2">
//                 <span>
//                   <i className="fa fa-shopping-cart" />
//                   Orders
//                 </span>
//               </div>
//               <div className="summary-body">{summary.orders[0] ? summary.orders[0].numOrders : 0}</div>
//             </li>
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }

// export default DashboardScreen;
