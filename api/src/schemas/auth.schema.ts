import Joi from "joi";
import { User } from "../types/user.types";

const authSchema: Joi.ObjectSchema<User> = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string(),
});

export default authSchema;
