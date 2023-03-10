import { RequestHandler } from "express";
import { Transaction } from "../../types/transaction.types";
import transactionsService from "../../services/transactions";
import {
  GetTransactionsResponse,
  PostTransactionResponse,
  PutTransactionParams,
} from "./transactions.controller.types";
import { AuthRequest } from "../../middlewares/auth.middleware";

const postTransaction: RequestHandler<
  any,
  PostTransactionResponse,
  Transaction
> = async (req, res, next) => {
  const transaction = req.body;
  const userId = (req as AuthRequest).user.id;

  const addedTransaction = await transactionsService.addTransaction(
    transaction,
    userId
  );
  res.status(201).send({ id: addedTransaction.id });
  next();
};

const getTransactions: RequestHandler<any, GetTransactionsResponse> = async (
  req,
  res,
  next
) => {
  const userId = (req as AuthRequest).user.id;
  const transactions = await transactionsService.findTransactionsByUserId(
    userId
  );
  res.status(200).send(transactions);
  next();
};

const putTransaction: RequestHandler<
  PutTransactionParams,
  any,
  Transaction
> = async (req, res, next) => {
  const transaction = req.body;
  const transactionId = req.params.id;

  await transactionsService.updateTransaction(transactionId, transaction);
  res.status(200).send();
  next();
};

const transactionsController = {
  postTransaction,
  getTransactions,
  putTransaction,
};

export default transactionsController;
