import { Document, Types } from "mongoose";

export type MongoDocument<T> = Document & T;
