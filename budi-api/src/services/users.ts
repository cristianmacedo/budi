import usersDb from "../db/users/users.db";
import { User, UserType } from "../types/user.types";
import HttpError from "../utils/HttpError";
import passwordUtils from "../utils/password";
import userValidator from "../validators/user.validator";

async function addUser(user: User) {
  const { error: validationErrorMessage } = userValidator(user);

  if (validationErrorMessage) {
    throw new HttpError(422, validationErrorMessage);
  }

  const alreadyRegisteredUser = await usersDb.findUser("email", user.email);
  if (alreadyRegisteredUser)
    throw new HttpError(409, "email-already-registered");

  const hashedPassword = passwordUtils.hashPassword(user.password);

  const newUserProps: User = {
    type: UserType.COMMON,
    name: user.name,
    email: user.email,
    icon: user.icon,
    password: hashedPassword,
    contacts: [],
  };

  return await usersDb.addUser(newUserProps);
}

async function findUserById(id: string) {
  return await usersDb.findUser("id", id);
}

const usersService = {
  addUser,
  findUserById,
};

export default usersService;
