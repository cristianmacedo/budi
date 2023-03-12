import express from "express";

import transactionsController from "../controllers/transactions";
import { PutTransactionParams } from "../controllers/transactions/transactions.controller.types";
import authMiddleware from "../middlewares/auth.middleware";

const transactionsRouter = express.Router();

transactionsRouter.post(
  "/",
  authMiddleware,
  transactionsController.postTransaction
);
transactionsRouter.put<PutTransactionParams>(
  "/:id",
  authMiddleware,
  transactionsController.putTransaction
);
transactionsRouter.get(
  "/",
  authMiddleware,
  transactionsController.getTransactions
);

export default transactionsRouter;
