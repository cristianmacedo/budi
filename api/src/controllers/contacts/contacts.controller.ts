import { RequestHandler } from "express";
import { Contact } from "../../types/contact.types";
import contactsService from "../../services/contacts";
import { PostContactResponse } from "./contacts.controller.types";
import { AuthRequest } from "../../middlewares/auth.middleware";

const postContact: RequestHandler<any, PostContactResponse, Contact> = async (
  req,
  res,
  next
) => {
  const contact = req.body;
  const userId = (req as AuthRequest).user.id;

  const addedContact = await contactsService.addContact(contact, userId);
  res.status(201).send({ id: addedContact.id });
  next();
};

const contactsController = {
  postContact,
};

export default contactsController;
