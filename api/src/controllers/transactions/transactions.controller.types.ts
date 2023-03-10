import { SerializedTransaction } from "../../types/transaction.types";

export interface PostTransactionResponse {
  id: string;
}

export interface PutTransactionParams {
  id: string;
}

export type GetTransactionsResponse = SerializedTransaction[];
