import Joi from "joi";
import { Transaction, TransactionType } from "../types/transaction.types";

const contactSchema: Joi.ObjectSchema<Transaction> = Joi.object().keys({
  date: Joi.date().required(),
  type: Joi.string()
    .valid(...Object.values(TransactionType))
    .required(),
  description: Joi.string().required(),
  value: Joi.number().required(),
  contact: Joi.string().required(),
});

export default contactSchema;
