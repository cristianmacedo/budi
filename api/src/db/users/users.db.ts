import { Types } from "mongoose";
import { SerializedContact } from "../../types/contact.types";
import { SerializedTransaction } from "../../types/transaction.types";
import { User as UserType } from "../../types/user.types";
import { ContactDocument } from "../contacts/contacts.types";

import UserModel from "./users.model";
import serializeUser from "./users.serialize";
import { UserDocument } from "./users.types";

async function addUser(newUser: UserType) {
  const user = await UserModel.create(newUser);
  return await serializeUser(user);
}

async function listUsers() {
  const users = await UserModel.find({});
  return await serializeUser(users);
}

async function findUsersBy(prop: keyof UserType | "id" | "_id", val: string) {
  if (prop === "id") {
    prop = "_id";
  }
  const users = await UserModel.find({ [prop]: val });
  return await serializeUser(users);
}

async function findUser(prop: keyof UserType | "id" | "_id", val: string) {
  if (prop === "id") {
    prop = "_id";
  }
  const users = await UserModel.find({ [prop]: val });
  return await serializeUser(users[0]);
}

async function addContact(id: string, contact: SerializedContact) {
  const updatedUser = (await UserModel.findByIdAndUpdate(
    id,
    { $push: { contacts: contact.id } },
    { new: true, useFindAndModify: false }
  )) as UserDocument;
  return await serializeUser(updatedUser);
}

async function addTransaction(id: string, transaction: SerializedTransaction) {
  const updatedUser = (await UserModel.findByIdAndUpdate(
    id,
    { $push: { transactions: transaction.id } },
    { new: true, useFindAndModify: false }
  )) as UserDocument;
  return await serializeUser(updatedUser);
}

async function deleteUser(id: string) {
  const user = (await UserModel.findByIdAndDelete(id)) as UserDocument;
  return await serializeUser(user);
}

const usersDb = {
  addUser,
  listUsers,
  findUsersBy,
  findUser,
  deleteUser,
  addContact,
  addTransaction,
};

export default usersDb;
