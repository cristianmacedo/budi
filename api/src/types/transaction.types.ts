import { Types } from "mongoose";
import { Contact } from "./contact.types";

export enum TransactionType {
  IN = "in",
  OUT = "out",
}

export interface Transaction {
  date: Date;
  type: TransactionType;
  name: string;
  value: number;
  contact: string | Types.ObjectId | Contact;
}
