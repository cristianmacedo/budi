import usersDb from "../db/users/users.db";
import { User } from "../types/user.types";
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
  const icon = user.icon || "https://via.placeholder.com/150";

  const newUser: User = {
    name: user.name,
    email: user.email,
    password: hashedPassword,
    transactions: [],
    contacts: [],
    icon,
  };

  return await usersDb.addUser(newUser);
}

async function addContactIdToUser(userId: string, contactId: string) {
  return await usersDb.addContactIdToUser(userId, contactId);
}

async function findUserById(id: string) {
  return await usersDb.findUser("id", id);
}

const usersService = {
  addUser,
  addContactIdToUser,
  findUserById,
};

export default usersService;
