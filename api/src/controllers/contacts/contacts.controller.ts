import { RequestHandler } from "express";
import { Contact } from "../../types/contact.types";
import contactsService from "../../services/contacts";
import {
  GetContactsResponse,
  PostContactResponse,
} from "./contacts.controller.types";
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

const getContacts: RequestHandler<any, GetContactsResponse> = async (
  req,
  res,
  next
) => {
  const userId = (req as AuthRequest).user.id;
  const contacts = await contactsService.findContactsByUserId(userId);
  res.status(200).send(contacts);
  next();
};

const contactsController = {
  postContact,
  getContacts,
};

export default contactsController;
