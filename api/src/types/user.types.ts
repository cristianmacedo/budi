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
}

export type SerializedUser = User & Serialized;
