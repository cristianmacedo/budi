import userSchema from "../schemas/user.schema";
import buildValidator from "../utils/buildValidator";

const userValidator = buildValidator(userSchema);

export default userValidator;
