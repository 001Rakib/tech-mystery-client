"use server";
import axiosInstance from "@/src/lib/Axios";
import { FieldValues } from "react-hook-form";

export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getPosts = async () => {
  const res = await fetch("http://localhost:5000/api/posts", {
    next: { tags: ["POSTS"] },
  });

  return res.json();
};
