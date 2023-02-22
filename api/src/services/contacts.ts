import contactsDb from "../db/contacts/contacts.db";
import usersDb from "../db/users";
import { Contact } from "../types/contact.types";
import HttpError from "../utils/HttpError";
import contactValidator from "../validators/contact.validator";
import userValidator from "../validators/user.validator";

async function addContact(contact: Contact) {
  const { error: validationErrorMessage } = contactValidator(contact);

  if (validationErrorMessage) {
    throw new HttpError(422, validationErrorMessage);
  }

  const icon = contact.icon || "https://via.placeholder.com/150";
  const description = contact.description || "";
  const identity = contact.identity || "";

  const newContact: Contact = {
    name: contact.name,
    description,
    identity,
    icon,
  };

  return await contactsDb.addContact(newContact);
}

const contactsService = {
  addContact,
};

export default contactsService;
