import Joi from "joi";
import { Contact } from "../types/contact.types";

const contactSchema: Joi.ObjectSchema<Contact> = Joi.object().keys({
  name: Joi.string().required(),
  identity: Joi.string(),
  description: Joi.string(),
  icon: Joi.string(),
});

export default contactSchema;
