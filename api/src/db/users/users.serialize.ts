import { User } from "../../types/user.types";
import { UserDocument } from "./users.types";

const serializeSingle = (user: UserDocument) => {
  const userObj = user.toObject<User>();

  return {
    id: userObj._id,
    email: userObj.email,
    icon: userObj.icon,
    password: userObj.password,
  };
};

function serializeUser(data: null): null;
function serializeUser(data: UserDocument[]): UserDocument[];
function serializeUser(data: UserDocument): UserDocument;
function serializeUser(data: null | UserDocument | UserDocument[]) {
  if (data === null || !data) {
    return null;
  }
  if (Array.isArray(data)) {
    return data.map(serializeSingle) as UserDocument[];
  }
  return serializeSingle(data) as UserDocument;
}

export default serializeUser;
