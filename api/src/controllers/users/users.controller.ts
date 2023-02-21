import { RequestHandler } from "express";
import { User } from "../../types/user.types";
import usersService from "../../services/users";
import { ErrorResponse } from "../controllers.types";
import { PostUserResponse } from "./users.controller.types";

const postUser: RequestHandler<
  any,
  PostUserResponse | ErrorResponse,
  User
> = async (req, res, next) => {
  const user = req.body;

  try {
    const addedUser = await usersService.addUser(user);
    res.status(201).send({ id: addedUser.id });
    next();
  } catch (error: any) {
    res.status(error.code || 500).send({ error: error.message }) && next(error);
  }
};

const usersController = {
  postUser,
};

export default usersController;
