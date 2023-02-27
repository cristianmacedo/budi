import { SerializedUser, User } from "../../types/user.types";
import { UserDocument } from "./users.types";

const serializeSingle = (user: UserDocument): SerializedUser => {
  const userObj = user.toObject<SerializedUser>();

  return {
    id: userObj._id.toString(),
    type: userObj.type,
    name: userObj.name,
    email: userObj.email,
    icon: userObj.icon,
    password: userObj.password,
    createdAt: userObj.createdAt,
    updatedAt: userObj.updatedAt,
  };
};

function serializeUser(data: null): null;
function serializeUser(data: UserDocument[]): SerializedUser[];
function serializeUser(data: UserDocument): SerializedUser;
function serializeUser(data: null | UserDocument | UserDocument[]) {
  if (data === null || !data) {
    return null;
  }
  if (Array.isArray(data)) {
    return data.map(serializeSingle);
  }
  return serializeSingle(data);
}

export default serializeUser;
