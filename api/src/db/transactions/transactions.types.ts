import { Transaction } from "../../types/transaction.types";
import { MongoDocument } from "../db.types";

export type TransactionDocument = MongoDocument<Transaction>;
