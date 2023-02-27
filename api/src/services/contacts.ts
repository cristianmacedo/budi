import { Types } from "mongoose";
import contactsDb from "../db/contacts/contacts.db";
import usersDb from "../db/users";
import { Contact } from "../types/contact.types";
import HttpError from "../utils/HttpError";
import contactValidator from "../validators/contact.validator";
import userValidator from "../validators/user.validator";

async function addContact(contact: Contact, userId: string) {
  const { error: validationErrorMessage } = contactValidator(contact);

  if (validationErrorMessage) {
    throw new HttpError(422, validationErrorMessage);
  }

  const newContact: Contact = {
    name: contact.name,
    identity: contact.identity,
    description: contact.description,
    icon: contact.icon,
    user: new Types.ObjectId(userId),
  };

  return await contactsDb.addContact(newContact);
}

async function findContactsByUserId(userId: string) {
  return await contactsDb.findContactsBy("user", userId);
}

const contactsService = {
  addContact,
  findContactsByUserId,
};

export default contactsService;
