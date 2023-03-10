import mongoose from "mongoose";
import { Contact } from "../../types/contact.types";
const { Schema } = mongoose;

const contactSchema = new Schema<Contact>(
  {
    name: { type: String, required: true },
    identity: { type: String },
    description: { type: String },
    icon: { type: String },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model("Contact", contactSchema);

export default ContactModel;
