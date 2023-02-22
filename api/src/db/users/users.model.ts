import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    icon: { type: String, required: true },
    contacts: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
    transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
