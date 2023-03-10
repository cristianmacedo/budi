import {
  Transaction,
  Transaction as TransactionType,
} from "../../types/transaction.types";

import TransactionModel from "./transactions.model";
import serializeTransaction from "./transactions.serialize";
import { TransactionDocument } from "./transactions.types";

async function addTransaction(newTransaction: TransactionType) {
  const transaction = await TransactionModel.create(newTransaction);
  return serializeTransaction(transaction);
}

async function listTransactions() {
  const transactions = await TransactionModel.find({});
  return serializeTransaction(transactions);
}

async function findTransactionsBy(
  prop: keyof TransactionType | "id" | "_id",
  val: string
) {
  if (prop === "id") {
    prop = "_id";
  }
  const transactions = await TransactionModel.find({ [prop]: val });
  return serializeTransaction(transactions);
}

async function findTransaction(
  prop: keyof TransactionType | "id" | "_id",
  val: string
) {
  if (prop === "id") {
    prop = "_id";
  }
  const transactions = await TransactionModel.find({ [prop]: val });
  return serializeTransaction(transactions[0]);
}

async function deleteTransaction(id: string) {
  const transaction = (await TransactionModel.findByIdAndDelete(
    id
  )) as TransactionDocument;
  return serializeTransaction(transaction);
}

async function updateTransaction(id: string, newTransaction: Transaction) {
  const contact = (await TransactionModel.findByIdAndUpdate(
    id,
    newTransaction
  )) as TransactionDocument;
  return serializeTransaction(contact);
}

const transactionsDb = {
  addTransaction,
  listTransactions,
  findTransactionsBy,
  findTransaction,
  deleteTransaction,
  updateTransaction,
};

export default transactionsDb;
