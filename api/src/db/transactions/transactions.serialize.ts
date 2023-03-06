import {
  SerializedTransaction,
  Transaction,
} from "../../types/transaction.types";
import { TransactionDocument } from "./transactions.types";

const serializeSingle = (
  transaction: TransactionDocument
): SerializedTransaction => {
  const transactionObj = transaction.toObject<SerializedTransaction>();

  return {
    id: transactionObj._id.toString(),
    contact: transactionObj.contact,
    user: transactionObj.user,
    type: transactionObj.type,
    name: transactionObj.name,
    date: transactionObj.date,
    value: transactionObj.value,
    createdAt: transactionObj.createdAt,
    updatedAt: transactionObj.updatedAt,
  };
};

function serializeTransaction(data: null): null;
function serializeTransaction(
  data: TransactionDocument[]
): SerializedTransaction[];
function serializeTransaction(data: TransactionDocument): SerializedTransaction;
function serializeTransaction(
  data: null | TransactionDocument | TransactionDocument[]
) {
  if (data === null || !data) {
    return null;
  }
  if (Array.isArray(data)) {
    return data.map(serializeSingle);
  }
  return serializeSingle(data);
}

export default serializeTransaction;
