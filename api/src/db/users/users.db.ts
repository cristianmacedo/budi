import { Types } from "mongoose";
import { User as UserType } from "../../types/user.types";

import UserModel from "./users.model";
import serializeUser from "./users.serialize";
import { UserDocument } from "./users.types";

async function addUser(newUser: UserType) {
  const user = await await UserModel.create(newUser);
  return serializeUser(user);
}

async function listUsers() {
  const users = await UserModel.find({}).populate("contacts");
  return serializeUser(users);
}

async function findUsersBy(prop: keyof UserType | "id" | "_id", val: string) {
  if (prop === "id") {
    prop = "_id";
  }
  const users = await UserModel.find({ [prop]: val }).populate("contacts");
  return serializeUser(users);
}

async function findUser(prop: keyof UserType | "id" | "_id", val: string) {
  if (prop === "id") {
    prop = "_id";
  }
  const users = await UserModel.find({ [prop]: val }).populate("contacts");
  return serializeUser(users[0]);
}

async function deleteUser(id: string) {
  const user = await (
    (await UserModel.findByIdAndDelete(id)) as UserDocument
  ).populate("contacts");
  return serializeUser(user);
}

async function addContactIdToUser(userId: string, contactId: string) {
  const user = await (
    (await UserModel.findByIdAndUpdate(userId, {
      $addToSet: { contacts: contactId },
    })) as UserDocument
  ).populate("contacts");
  return serializeUser(user);
}

async function removeContactIdFromUser(userId: string, contactId: string) {
  const user = await (
    (await UserModel.findByIdAndUpdate(userId, {
      $pull: { contacts: contactId },
    })) as UserDocument
  ).populate("contacts");
  return serializeUser(user);
}

const usersDb = {
  addUser,
  listUsers,
  findUsersBy,
  findUser,
  deleteUser,
  addContactIdToUser,
  removeContactIdFromUser,
};

export default usersDb;
