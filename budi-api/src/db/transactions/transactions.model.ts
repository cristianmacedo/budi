import mongoose, { Types } from "mongoose";
import { Transaction, TransactionType } from "../../types/transaction.types";
const { Schema } = mongoose;

const transactionSchema = new Schema<Transaction>(
  {
    user: { type: Types.ObjectId, ref: "User" },
    contact: { type: Types.ObjectId, ref: "Contact" },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    value: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const TransactionModel = mongoose.model("Transaction", transactionSchema);

export default TransactionModel;
