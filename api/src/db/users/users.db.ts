import { Types } from "mongoose";
import { User as UserType } from "../../types/user.types";

import UserModel from "./users.model";
import serializeUser from "./users.serialize";
import { UserDocument } from "./users.types";

async function addUser(newUser: UserType) {
  const user = await UserModel.create(newUser);
  return serializeUser(user);
}

async function listUsers() {
  const users = await UserModel.find({});
  return serializeUser(users);
}

async function findUsersBy(prop: keyof UserType | "id" | "_id", val: string) {
  if (prop === "id") {
    prop = "_id";
  }
  const users = await UserModel.find({ [prop]: val });
  return serializeUser(users);
}

async function findUser(prop: keyof UserType | "id" | "_id", val: string) {
  if (prop === "id") {
    prop = "_id";
  }
  const users = await UserModel.find({ [prop]: val });
  return serializeUser(users[0]);
}

async function deleteUser(id: string) {
  const user = (await UserModel.findByIdAndDelete(id)) as UserDocument;
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
