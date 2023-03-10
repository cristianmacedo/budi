import { Request, RequestHandler } from "express";
import usersService from "../services/users";
import { SerializedUser } from "../types/user.types";
import HttpError from "../utils/HttpError";

export interface AuthRequest extends Request {
  user: SerializedUser;
}

const authMiddleware: RequestHandler<any> = async (req, _res, next) => {
  const userId = req.headers.authorization;

  if (!userId) throw new HttpError(401, "not-authenticated");

  const authenticationUser = await usersService.findUserById(userId);

  if (!authenticationUser) throw new HttpError(401, "invalid-authentication");

  (req as AuthRequest).user = authenticationUser;

  next();
};

export default authMiddleware;
