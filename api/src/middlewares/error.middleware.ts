import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/HttpError";

function errorMiddleware(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code = error.code || 500;
  const message = error.message || "Something went wrong";
  res.status(code).send({ error: message });
}

export default errorMiddleware;
