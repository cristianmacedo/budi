import usersDb from "../db/users/users.db";
import { Auth } from "../types/auth.types";
import passwordUtils from "../utils/password";
import HttpError from "../utils/HttpError";
import authValidator from "../validators/auth.validator";

const login = async (auth: Auth) => {
  const { error: validationErrorMessage } = authValidator(auth);

  if (validationErrorMessage) {
    throw new HttpError(422, validationErrorMessage);
  }

  const { email, password } = auth;

  const user = await usersDb.findUser("email", email);
  if (!user) throw new HttpError(401, "invalid-email-or-password");

  const match = passwordUtils.comparePassword(password, user.password);

  if (match) {
    return user.id;
  }

  throw new HttpError(401, "invalid-email-or-password");
};

const authService = {
  login,
};

export default authService;
