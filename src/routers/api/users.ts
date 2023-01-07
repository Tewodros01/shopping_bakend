import express, { Request, Response, Router } from "express";
import user_router from "../../handlers/users";

const userRouter = Router();
user_router(userRouter);

export default userRouter;
