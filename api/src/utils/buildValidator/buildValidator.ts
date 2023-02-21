import Joi from "joi";

import { Validator } from "./buildValidator.types";

function buildValidator(schema: Joi.ObjectSchema): Validator {
  return (payload) => {
    const { error } = schema.validate(payload, { abortEarly: false });
    if (error) {
      const message = error.details.map((el) => el.message).join("\n");
      return {
        success: false,
        error: message,
      };
    }
    return {
      success: true,
      error: null,
    };
  };
}

export default buildValidator;
