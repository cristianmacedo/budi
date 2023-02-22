import { Contact as ContactType } from "../../types/contact.types";

import ContactModel from "./contacts.model";
import serializeContact from "./contacts.serialize";
import { ContactDocument } from "./contacts.types";

async function addContact(newContact: ContactType) {
  const contact = await ContactModel.create(newContact);
  return serializeContact(contact);
}

async function listContacts() {
  const contacts = await ContactModel.find({});
  return serializeContact(contacts);
}

async function findContactsBy(
  prop: keyof ContactType | "id" | "_id",
  val: string
) {
  if (prop === "id") {
    prop = "_id";
  }
  const contacts = await ContactModel.find({ [prop]: val });
  return serializeContact(contacts);
}

async function findContact(
  prop: keyof ContactType | "id" | "_id",
  val: string
) {
  if (prop === "id") {
    prop = "_id";
  }
  const contacts = await ContactModel.find({ [prop]: val });
  return serializeContact(contacts[0]);
}

async function deleteContact(id: string) {
  const contact = (await ContactModel.findByIdAndDelete(id)) as ContactDocument;
  return serializeContact(contact);
}

const contactsDb = {
  addContact,
  listContacts,
  findContactsBy,
  findContact,
  deleteContact,
};

export default contactsDb;
