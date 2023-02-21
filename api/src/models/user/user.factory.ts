import passwordUtils from "../../utils/password";
import { User } from "../../types/user.types";

const makeUser = function (user: User) {
  const hashedPassword = passwordUtils.hashPassword(user.password);

  const icon = user.icon || "https://via.placeholder.com/150";

  return {
    getName: () => user.name,
    getEmail: () => user.email,
    getPassword: () => hashedPassword,
    getIcon: () => icon,
  };
};

export default makeUser;
