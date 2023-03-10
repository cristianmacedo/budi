import { Types } from "mongoose";
import { Serialized } from "./serialized.types";
import { User } from "./user.types";

export interface Contact {
  name: string;
  identity?: string;
  description?: string;
  icon?: string;
}

export type SerializedContact = Contact & Serialized;
