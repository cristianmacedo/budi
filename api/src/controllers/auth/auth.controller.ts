import { RequestHandler } from "express";
import authService from "../../services/auth";
import { Auth } from "../../types/auth.types";
import { AuthLoginResponse } from "./auth.controller.types";

const login: RequestHandler<any, AuthLoginResponse, Auth> = async (
  req,
  res,
  next
) => {
  const auth = req.body;

  const token = await authService.login(auth);
  res.status(200).send({ token });
  next();
};

const authController = {
  login,
};

export default authController;
