import express, { Router } from "express";
import order_router from "../../handlers/orders";

const orderRouter = Router();
order_router(orderRouter);

export default orderRouter;
