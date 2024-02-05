import { SerializedContact } from "../../types/contact.types";

export interface PostContactResponse {
  id: string;
}

export interface PutContactParams {
  id: string;
}

export type GetContactsResponse = SerializedContact[];
