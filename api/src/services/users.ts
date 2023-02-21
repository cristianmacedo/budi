import usersDb from "../db/users/users.db";
import { User } from "../types/user.types";
import HttpError from "../utils/HttpError";
import userValidator from "../validators/user.validator";

async function addUser(user: User) {
  const { error: validationErrorMessage } = userValidator(user);

  if (validationErrorMessage) {
    throw new HttpError(422, validationErrorMessage);
  }

  const { email } = user;

  const alreadyRegisteredUser = await usersDb.findUser("email", email);
  if (alreadyRegisteredUser)
    throw new HttpError(409, "email-already-registered");

  return await usersDb.addUser(user);
}
const usersService = {
  addUser,
};

export default usersService;
