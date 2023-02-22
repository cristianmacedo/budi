import { Types } from "mongoose";

export interface Contact {
  name: string;
  identity?: string;
  description?: string;
  icon?: string;
}
