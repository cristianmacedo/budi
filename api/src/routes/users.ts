import express from "express";

import usersController from "../controllers/users";

const usersRouter = express.Router();

usersRouter.post("/", usersController.postUser);
usersRouter.get("/:id", usersController.getUser);

export default usersRouter;
