import { User } from "./User";

export enum MemoryType {
  image,
  video,
}

export enum Privacy {
  private,
  public,
}
export interface Memory {
  _id: string;
  user?: User;
  name: string;
  url: string;
  memoryType: MemoryType;
  privacy: Privacy;
  createdAt: Date;
  updatedAt: Date;
}
