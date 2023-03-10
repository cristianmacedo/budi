import mongoose, { Types } from "mongoose";
import { User, UserType } from "../../types/user.types";
const { Schema } = mongoose;

const userSchema = new Schema<User>(
  {
    type: { type: String, enum: Object.values(UserType), required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    icon: { type: String },
    contacts: [{ type: Types.ObjectId, ref: "Contact" }],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
