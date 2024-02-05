import express from "express";

import contactsController from "../controllers/contacts";
import { PutContactParams } from "../controllers/contacts/contacts.controller.types";
import authMiddleware from "../middlewares/auth.middleware";

const contactsRouter = express.Router();

contactsRouter.post("/", authMiddleware, contactsController.postContact);
contactsRouter.put<PutContactParams>(
  "/:id",
  authMiddleware,
  contactsController.putContact
);

export default contactsRouter;
