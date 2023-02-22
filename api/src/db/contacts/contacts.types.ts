import { Contact } from "../../types/contact.types";
import { MongoDocument } from "../db.types";

export type ContactDocument = MongoDocument<Contact>;
