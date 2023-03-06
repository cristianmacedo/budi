import { RequestHandler } from "express";
import { Transaction } from "../../types/transaction.types";
import transactionsService from "../../services/transactions";
import {
  GetTransactionsResponse,
  PostTransactionResponse,
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

const transactionsController = {
  postTransaction,
  getTransactions,
};

export default transactionsController;
