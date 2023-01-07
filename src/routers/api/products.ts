import express, { Request, Response, Router } from "express";
import product_router from "../../handlers/products";

const productRouter = Router();
product_router(productRouter);

export default productRouter;
