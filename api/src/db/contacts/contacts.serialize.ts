import { Types } from "mongoose";
import { Contact, SerializedContact } from "../../types/contact.types";
import { ContactDocument } from "./contacts.types";

const serializeSingle = (contact: ContactDocument): SerializedContact => {
  const contactObj = contact.toObject<SerializedContact>();

  return {
    id: contactObj._id.toString(),
    description: contactObj.description,
    icon: contactObj.icon,
    identity: contactObj.identity,
    name: contactObj.name,
    user: contactObj.user,
    createdAt: contactObj.createdAt,
    updatedAt: contactObj.updatedAt,
  };
};

function serializeContact(data: null): null;
function serializeContact(data: ContactDocument[]): SerializedContact[];
function serializeContact(data: ContactDocument): SerializedContact;
function serializeContact(data: null | ContactDocument | ContactDocument[]) {
  if (data === null || !data) {
    return null;
  }
  if (Array.isArray(data)) {
    return data.map(serializeSingle);
  }
  return serializeSingle(data);
}

export default serializeContact;
