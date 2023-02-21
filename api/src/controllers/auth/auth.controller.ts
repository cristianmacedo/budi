import { RequestHandler } from "express";
import authService from "../../services/auth";
import { Auth } from "../../types/auth.types";
import { ErrorResponse } from "../controllers.types";
import { AuthLoginResponse } from "./auth.controller.types";

const login: RequestHandler<
  any,
  AuthLoginResponse | ErrorResponse,
  Auth
> = async (req, res, next) => {
  const auth = req.body;

  try {
    const token = await authService.login(auth);
    res.status(200).send({ token });
    next();
  } catch (error: any) {
    res.status(error.code || 500).send({ error: error.message }) && next(error);
  }
};

const authController = {
  login,
};

export default authController;
