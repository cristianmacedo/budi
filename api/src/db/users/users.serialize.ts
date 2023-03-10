import { SerializedUser, User } from "../../types/user.types";
import serializeContact from "../contacts/contacts.serialize";
import { ContactDocument } from "../contacts/contacts.types";
import { UserDocument } from "./users.types";

const serializeSingle = async (user: UserDocument): Promise<SerializedUser> => {
  const userObj = user.toObject<SerializedUser>();

  const contacts = (await user.populate("contacts"))
    .contacts as ContactDocument[];

  const serializedContacts = serializeContact(contacts);

  return {
    id: userObj._id.toString(),
    type: userObj.type,
    name: userObj.name,
    email: userObj.email,
    icon: userObj.icon,
    password: userObj.password,
    contacts: serializedContacts,
    createdAt: userObj.createdAt,
    updatedAt: userObj.updatedAt,
  };
};

async function serializeUser(data: null): Promise<null>;
async function serializeUser(data: UserDocument[]): Promise<SerializedUser[]>;
async function serializeUser(data: UserDocument): Promise<SerializedUser>;
async function serializeUser(data: null | UserDocument | UserDocument[]) {
  if (data === null || !data) {
    return null;
  }
  if (Array.isArray(data)) {
    const res = [];
    for (const item of data) {
      const serializedItem = await serializeSingle(item);
      res.push(serializedItem);
    }
    return res;
  }
  return await serializeSingle(data);
}

export default serializeUser;
