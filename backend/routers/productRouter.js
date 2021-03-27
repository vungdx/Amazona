import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/all",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments({});
    const products = await Product.find({})
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);
// Xem chi tiết sản phẩm
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "same name" + Date.now(),
      image: "/images/p1.jpg",
      price: 0,
      brand: "same brand",
      category: "same category",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "same description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: "Product updated successfully", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
