import express, { Request, Response, Router } from "express";
import userRouter from "./api/users";
import productRouter from "./api/products";
import orderRouter from "./api/orders";

const router = Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);

export default router;
