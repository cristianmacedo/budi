import { RequestHandler } from "express";
import { Contact } from "../../types/contact.types";
import contactsService from "../../services/contacts";
import { PostContactResponse } from "./contacts.controller.types";
import usersService from "../../services/users";
import { AuthRequest } from "../../middlewares/auth.middleware";

const postContact: RequestHandler<any, PostContactResponse, Contact> = async (
  req,
  res,
  next
) => {
  const contact = req.body;

  const addedContact = await contactsService.addContact(contact);
  const updatedUser = await usersService.addContactIdToUser(
    (req as AuthRequest).user.id,
    addedContact.id
  );
  res.status(201).send({ id: addedContact.id, userId: updatedUser.id });
  next();
};

const contactsController = {
  postContact,
};

export default contactsController;
