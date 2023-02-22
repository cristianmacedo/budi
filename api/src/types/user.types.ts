import { Types } from "mongoose";
import { Contact } from "./contact.types";
import { Serialized } from "./serialized.types";
import { Transaction } from "./transaction.types";

export interface User {
  name: string;
  email: string;
  password: string;
  icon?: string;
  contacts: string[] | Types.ObjectId[] | Contact[];
  transactions: string[] | Types.ObjectId[] | Transaction[];
}

export type SerializedUser = User & Serialized;
