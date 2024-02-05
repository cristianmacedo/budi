import transactionSchema from "../schemas/transaction.schema";
import buildValidator from "../utils/buildValidator";

const transactionValidator = buildValidator(transactionSchema);

export default transactionValidator;
