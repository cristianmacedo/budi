import { Request, RequestHandler } from "express";
import { Contact } from "../../types/contact.types";
import contactsService from "../../services/contacts";
import {
  PostContactResponse,
  PutContactParams,
} from "./contacts.controller.types";
import { Filters } from "../../types/filters.types";

const postContact: RequestHandler<any, PostContactResponse, Contact> = async (
  req,
  res,
  next
) => {
  const contact = req.body;
  const userId = req.user.id;

  const addedContact = await contactsService.addContact(contact, userId);
  res.status(201).send({ id: addedContact.id });
  next();
};

const putContact: RequestHandler<PutContactParams, any, Contact> = async (
  req,
  res,
  next
) => {
  const contact = req.body;
  const contactId = req.params.id;

  await contactsService.updateContact(contactId, contact);
  res.status(200).send();
  next();
};

const contactsController = {
  postContact,
  putContact,
};

export default contactsController;
