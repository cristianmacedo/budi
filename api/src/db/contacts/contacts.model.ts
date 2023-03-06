import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    identity: { type: String },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model("Contact", contactSchema);

export default ContactModel;
