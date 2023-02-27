import { SerializedContact } from "../../types/contact.types";

export interface PostContactResponse {
  id: string;
}

export type GetContactsResponse = SerializedContact[];
