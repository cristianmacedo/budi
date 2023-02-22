import { SerializedUser } from "../../types/user.types";

export interface PostUserResponse {
  id: string;
}

export type GetUserResponse = SerializedUser;
