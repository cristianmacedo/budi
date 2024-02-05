import contactSchema from "../schemas/contact.schema";
import buildValidator from "../utils/buildValidator";

const contactValidator = buildValidator(contactSchema);

export default contactValidator;
