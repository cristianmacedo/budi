import bcrypt from "bcrypt";

function hashPassword(plaintextPassword: string) {
  return bcrypt.hashSync(plaintextPassword, 10);
}

function comparePassword(plaintextPassword: string, hash: string) {
  return bcrypt.compareSync(plaintextPassword, hash);
}

const passwordUtils = {
  hashPassword,
  comparePassword,
};

export default passwordUtils;
