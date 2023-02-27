import Joi from "joi";
import { Contact } from "../types/contact.types";

const contactSchema: Joi.ObjectSchema<Contact> = Joi.object().keys({
  name: Joi.string().required(),
  identity: Joi.string().required(),
  description: Joi.string(),
  icon: Joi.string().uri(),
});

export default contactSchema;
