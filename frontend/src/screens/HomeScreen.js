import React, { useEffect } from "react";
import Product from "./../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts } from "../actions/productActions";

HomeScreen.propTypes = {};

function HomeScreen(props) {
  const dispatch = useDispatch();
  const productListAll = useSelector((state) => state.productListAll);
  const { loading, error, products } = productListAll;

  useEffect(() => {
    dispatch(listAllProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varient="danger"></MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
