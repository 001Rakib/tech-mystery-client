import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface ILoggedInUser {
  _id: string;
  role: string;
  name: string;
  email: string;
  status: string;
  profilePicture: string;
  iat: number;
  exp: number;
}
export interface IUser {
  _id: string;
  role: string;
  name: string;
  status: string;
  profilePicture: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export interface IPost {
  _id: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  image: string;
  category: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
