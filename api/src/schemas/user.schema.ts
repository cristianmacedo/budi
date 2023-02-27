import Joi from "joi";
import { User } from "../types/user.types";

const userSchema: Joi.ObjectSchema<User> = Joi.object().keys({
  name: Joi.string()
    .regex(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]+$/
    )
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(12)
    .max(64)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,24}$/
    )
    .required(),
  icon: Joi.string().uri(),
});

export default userSchema;
