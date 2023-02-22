import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    identity: { type: String, required: true },
    description: { type: String },
    icon: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model("Contact", contactSchema);

export default ContactModel;
