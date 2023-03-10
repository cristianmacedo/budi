import { Types } from "mongoose";
import transactionsDb from "../db/transactions";
import { Transaction } from "../types/transaction.types";
import HttpError from "../utils/HttpError";
import transactionValidator from "../validators/transaction.validator";

async function addTransaction(transaction: Transaction, userId: string) {
  const { error: validationErrorMessage } = transactionValidator(transaction);

  if (validationErrorMessage) {
    throw new HttpError(422, validationErrorMessage);
  }

  const newTransaction: Transaction = {
    user: new Types.ObjectId(userId),
    contact: new Types.ObjectId(transaction.contact as string),
    date: new Date(transaction.date),
    description: transaction.description,
    type: transaction.type,
    value: transaction.value,
  };

  return await transactionsDb.addTransaction(newTransaction);
}

async function findTransactionsByUserId(userId: string) {
  return await transactionsDb.findTransactionsBy("user", userId);
}

async function updateTransaction(
  transactionId: string,
  newTransaction: Transaction
) {
  const { error: validationErrorMessage } =
    transactionValidator(newTransaction);

  if (validationErrorMessage) {
    throw new HttpError(422, validationErrorMessage);
  }

  await transactionsDb.updateTransaction(transactionId, newTransaction);
}

const transactionsService = {
  addTransaction,
  updateTransaction,
  findTransactionsByUserId,
};

export default transactionsService;
