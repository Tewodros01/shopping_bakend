import express, { Request, Response, Router } from "express";
import { ProdouctStore, Product } from "../models/products";

const store = new ProdouctStore();

const addNewProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productCategory: req.body.productCategory,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const allProduct = await store.index();
    res.json(allProduct);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const addCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await store.createCategory(req.body.categoryName);
    res.json(newCategory);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};
const product_router = (router: express.Router) => {
  router.get("/:id", getProduct);
  router.get("/", getAllProduct);
  router.post("/", addNewProduct);
  router.post("/category", addCategory);
};

export default product_router;
