import makeUser from "../../models/user";
import { User as UserType } from "../../types/user.types";

import User from "./users.model";
import serializeUser from "./users.serialize";
import { UserDocument } from "./users.types";

async function addUser(userInfo: UserType) {
  const validatedUserInfo = makeUser(userInfo);
  const newUser: UserType = {
    name: validatedUserInfo.getName(),
    email: validatedUserInfo.getEmail(),
    password: validatedUserInfo.getPassword(),
    icon: validatedUserInfo.getIcon(),
  };
  const user = await User.create(newUser);
  return serializeUser(user);
}

async function listUsers() {
  const users = await User.find({});
  return serializeUser(users);
}

async function findUsersBy(prop: keyof UserType | "id" | "_id", val: string) {
  if (prop === "id") {
    prop = "_id";
  }
  const users = await User.find({ [prop]: val });
  return serializeUser(users);
}

async function findUser(prop: keyof UserType | "id" | "_id", val: string) {
  if (prop === "id") {
    prop = "_id";
  }
  const users = await User.find({ [prop]: val });
  return serializeUser(users[0]);
}

async function deleteUser(id: string) {
  const user = (await User.findByIdAndDelete(id)) as UserDocument;
  return serializeUser(user);
}

const usersDb = {
  addUser,
  listUsers,
  findUsersBy,
  findUser,
  deleteUser,
};

export default usersDb;
