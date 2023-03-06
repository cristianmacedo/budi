import express from "express";

import transactionsController from "../controllers/transactions";
import authMiddleware from "../middlewares/auth.middleware";

const transactionsRouter = express.Router();

transactionsRouter.post(
  "/",
  authMiddleware,
  transactionsController.postTransaction
);
transactionsRouter.get(
  "/",
  authMiddleware,
  transactionsController.getTransactions
);

export default transactionsRouter;