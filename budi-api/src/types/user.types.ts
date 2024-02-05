import { Types } from "mongoose";
import { Contact } from "./contact.types";
import { Serialized } from "./serialized.types";

export enum UserType {
  COMMON = "common",
  ADMIN = "admin",
}

export interface User {
  type: UserType;
  name: string;
  email: string;
  password: string;
  icon?: string;
  contacts: (Types.ObjectId | string | Contact)[];
}

export type SerializedUser = User & Serialized;
