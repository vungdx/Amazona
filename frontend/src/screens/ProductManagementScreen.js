import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, listProducts, saveProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { productSaveReducer } from "../reducers/productReducers";

function ProductManagementScreen(props) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productSave = useSelector((state) => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    // do your side effect here...
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //Clean up here...
      // Executed before the next render or unmount
    };
  }, [successDelete, successSave]);
  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Product Management</h3>
        <button className="button primary create-product" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      <div className="product-management">
        {modalVisible ? (
          <div>
            <form className="form" onSubmit={submitHandler}>
              <div>
                <h1>Create product</h1>
              </div>
              {loadingDelete && <LoadingBox></LoadingBox>}
              {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

              {loadingSave && <LoadingBox></LoadingBox>}
              {errorSave && <MessageBox variant="danger">{errorSave}</MessageBox>}

              <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name} id="name" required onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input type="text" name="price" value={price} id="price" onChange={(e) => setPrice(e.target.value)}></input>
              </div>
              <div>
                <label htmlFor="image">Image</label>
                <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </div>
              <div>
                <label htmlFor="brand">Brand</label>
                <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
              </div>
              <div>
                <label htmlFor="countInStock">CountInStock</label>
                <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
              </div>
              <div>
                <label htmlFor="name">Category</label>
                <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
              <div>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div>
                <button type="button" onClick={() => setModalVisible(false)} className="button secondary">
                  Back
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger"></MessageBox>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <button className="button" onClick={() => openModal(product)}>
                          Edit
                        </button>
                        <button className="button" onClick={() => deleteHandler(product)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default ProductManagementScreen;
