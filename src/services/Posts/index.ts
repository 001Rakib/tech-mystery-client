"use server";
import axiosInstance from "@/src/lib/Axios";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData);
    revalidateTag("POSTS");
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getSinglePost = async (postId: string) => {
  let fetchOptions = {};

  const res = await fetch(
    `http://localhost:5000/api/posts/${postId}`,
    fetchOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export const getPosts = async () => {
  const res = await fetch("http://localhost:5000/api/posts", {
    next: { tags: ["POSTS"] },
  });

  return res.json();
};
