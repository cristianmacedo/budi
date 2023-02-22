import { Contact } from "../../types/contact.types";
import { ContactDocument } from "./contacts.types";

const serializeSingle = (contact: ContactDocument) => {
  const contactObj = contact.toObject<Contact>();

  return {
    id: contactObj._id.toString(),
    description: contactObj.description,
    icon: contactObj.icon,
    identity: contactObj.identity,
    name: contactObj.name,
  };
};

function serializeContact(data: null): null;
function serializeContact(data: ContactDocument[]): ContactDocument[];
function serializeContact(data: ContactDocument): ContactDocument;
function serializeContact(data: null | ContactDocument | ContactDocument[]) {
  if (data === null || !data) {
    return null;
  }
  if (Array.isArray(data)) {
    return data.map(serializeSingle) as ContactDocument[];
  }
  return serializeSingle(data) as ContactDocument;
}

export default serializeContact;
