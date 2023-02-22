import { Types } from "mongoose";
import { Contact } from "./contact.types";

export interface Transaction {
  date: Date;
  type: "in" | "out";
  name: string;
  value: number;
  contact: string | Types.ObjectId | Contact;
}
