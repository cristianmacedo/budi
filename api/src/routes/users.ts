import express from "express";

import usersController from "../controllers/users";
import authMiddleware from "../middlewares/auth.middleware";

const usersRouter = express.Router();

usersRouter.post("/", usersController.postUser);
usersRouter.get("/:id", authMiddleware, usersController.getUser);

export default usersRouter;
