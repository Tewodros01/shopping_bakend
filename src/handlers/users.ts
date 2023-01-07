import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserStore, User } from "../models/users";

let token_secret: any;
token_secret = process.env.TOKEN_SECRET;

const store = new UserStore();

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const allUser = await store.index();
    res.json(allUser);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};
const addNewUser = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password_digit: req.body.password_digit,
    };
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, token_secret);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const user_router = (router: express.Router) => {
  router.get("/:id", getUser);
  router.get("/", getAllUser);
  router.post("/", addNewUser);
};

export default user_router;
