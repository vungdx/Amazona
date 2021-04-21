import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { Link } from "react-router-dom";

SearchScreen.propTypes = {};

function SearchScreen(props) {
  const { name = "all", pageNumber = 1 } = useParams();
  console.log("thằng name ở đây là", name);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts({ pageNumber, name: name !== "all" ? name : "" }));
  }, [dispatch, name, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    return `/search/page/${filterPage}`;
  };
  return (
    <div>
      <div className="row">{loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> : <div>{products.length} Results</div>}</div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <ul>
            <li>Category 1</li>
          </ul>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && <MessageBox>No product Found</MessageBox>}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link className={x + 1 === page ? "active" : ""} key={x + 1} to={getFilterUrl({ page: x + 1 })}>
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
