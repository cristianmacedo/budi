import { RequestHandler } from "express";
import { User } from "../../types/user.types";
import usersService from "../../services/users";
import { GetUserResponse, PostUserResponse } from "./users.controller.types";

const postUser: RequestHandler<any, PostUserResponse, User> = async (
  req,
  res,
  next
) => {
  const user = req.body;

  const addedUser = await usersService.addUser(user);
  res.status(201).send({ id: addedUser.id });
  next();
};

const getUser: RequestHandler<{ id: string }, GetUserResponse> = async (
  req,
  res,
  next
) => {
  const user = await usersService.findUserById(req.params.id);
  res.status(201).send(user);
  next();
};

const usersController = {
  postUser,
  getUser,
};

export default usersController;
