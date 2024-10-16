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
  isPremiumMember: boolean;
  iat: number;
  exp: number;
}
export interface IUser {
  _id: string;
  role: string;
  name: string;
  profilePicture: string;
  email: string;
  isPremiumMember: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IPost {
  _id: string;
  author: Author;
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  category: string;
  topics: string[];
  upVote: IVote[];
  downVote: IVote[];
  shares: number;
  isPremium: boolean;
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
}
export interface IVote {
  _id: string;
  name: string;
  email: string;
  username: string;
  isPremiumMember: boolean;
}

export interface IComment {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    username: string;
    isEmailVerified: boolean;
    isPremiumMember: boolean;
    profileImg: string;
  };
  content: string;
  claps: IVote[];
  createdAt: string;
  updatedAt: string;
}

interface Author {
  _id: string;
  name: string;
  email: string;
  username: string;
  isPremiumMember: boolean;
  profileImg: string;
}

export interface IfollowersAndFollowing {
  _id: string;
  name: string;
  email: string;
  username: string;
  profileImg: string;
  isPremiumMember: boolean;
}

export interface IUserResponse extends Document {
  status: string;
  _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  isEmailVerified: boolean;
  role: "user" | "admin";
  profileImg: string;
  isPremiumMember: boolean;
  isBlocked: boolean;
  followers: IfollowersAndFollowing[];
  following: IfollowersAndFollowing[];
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IArticleResponse {}
