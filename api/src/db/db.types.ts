import { Document, ObjectId } from "mongoose";

export type MongoDocument<T> = Document &
  T & {
    createdAt: Date;
    updatedAt: Date;
  };
