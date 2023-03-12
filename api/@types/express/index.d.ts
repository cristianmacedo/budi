import { SerializedUser } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user: SerializedUser;
    }
  }
}
