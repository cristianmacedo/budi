import contactsDb from "../db/contacts/contacts.db";
import usersDb from "../db/users";
import { Contact } from "../types/contact.types";
import HttpError from "../utils/HttpError";
import contactValidator from "../validators/contact.validator";

async function addContact(contact: Contact, userId: string) {
  const { error: validationErrorMessage } = contactValidator(contact);

  if (validationErrorMessage) {
    throw new HttpError(422, validationErrorMessage);
  }

  const newContactProps: Contact = {
    name: contact.name,
    identity: contact.identity,
    description: contact.description,
    icon: contact.icon,
  };

  const addedContact = await contactsDb.addContact(newContactProps);

  await usersDb.addContact(userId, addedContact);

  return addedContact;
}

const contactsService = {
  addContact,
};

export default contactsService;
