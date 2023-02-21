import { User } from "../../types/user.types";
import { MongoDocument } from "../db.types";

export type UserDocument = MongoDocument<User>;
