import { User } from "./User";

export interface Memory {
  _id: string;
  user?: User;
  name: string;
  url: string;
  memoryType: string;
  privacy: string;
  createdAt: Date;
  updatedAt: Date;
}
