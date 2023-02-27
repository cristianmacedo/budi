import mongoose from "mongoose";
import { UserType } from "../../types/user.types";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    type: { type: String, enum: Object.values(UserType), required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    icon: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
