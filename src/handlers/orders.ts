import express, { Request, Response } from "express";
import { OrderStore, Order } from "../models/orders";

const store = new OrderStore();

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const allOrders = await store.indexOrder();
    res.json(allOrders);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const getAllProductOrder = async (req: Request, res: Response) => {
  try {
    const allProductOrders = await store.indexProductOrder();
    res.json(allProductOrders);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const addNewOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      orderStatus: req.body.orderStatus,
      userId: req.body.userId,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const addProductOrder = async (req: Request, res: Response) => {
  try {
    const newProductOrder = await store.createProductOrder(
      req.body.quantity,
      parseInt(req.params.orderId),
      req.body.productId
    );
    res.json(newProductOrder);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const order_router = (router: express.Router) => {
  router.get("/", getAllOrder);
  router.get("/product", getAllProductOrder);
  router.post("/", addNewOrder);
  router.post("/product/:id", addProductOrder);
};

export default order_router;
