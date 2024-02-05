import { RequestHandler } from "express";
import usersService from "../services/users";
import { SerializedUser } from "../types/user.types";
import HttpError from "../utils/HttpError";

const authMiddleware: RequestHandler<any> = async (req, res, next) => {
  const userId = req.headers.authorization;

  if (!userId) throw new HttpError(401, "not-authenticated");

  const authenticationUser = await usersService.findUserById(userId);

  if (!authenticationUser) throw new HttpError(401, "invalid-authentication");

  req.user = authenticationUser;

  next();
};

export default authMiddleware;
