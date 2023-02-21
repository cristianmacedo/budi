import authSchema from "../schemas/auth.schema";
import buildValidator from "../utils/buildValidator";

const authValidator = buildValidator(authSchema);

export default authValidator;
