import express from "express";

import contactsController from "../controllers/contacts/contacts.controller";
import authMiddleware from "../middlewares/auth.middleware";

const contactsRouter = express.Router();

contactsRouter.post("/", authMiddleware, contactsController.postContact);

export default contactsRouter;
