import { Types } from "mongoose";
import { Contact } from "./contact.types";
import { Serialized } from "./serialized.types";

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export interface Transaction {
  date: Date;
  type: TransactionType;
  name: string;
  value: number;
  user: string | Types.ObjectId | Contact;
  contact: string | Types.ObjectId | Contact;
}

export type SerializedTransaction = Transaction & Serialized;
