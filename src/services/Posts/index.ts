"use server";
import axiosInstance from "@/src/lib/Axios";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData);
    revalidateTag("ALL_POSTS");
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const upVotePost = async (upVoteData: FieldValues) => {
  try {
    const { data } = await axios.patch(
      "http://localhost:5000/api/posts/upVote",
      upVoteData
    );
    revalidateTag("POSTS");
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
export const downVotePost = async (downVoteData: FieldValues) => {
  try {
    const { data } = await axios.patch(
      "http://localhost:5000/api/posts/downVote",
      downVoteData
    );
    revalidateTag("POSTS");
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
export const commentOnPost = async (commentData: FieldValues) => {
  try {
    const { data } = await axios.put(
      "http://localhost:5000/api/posts/comment",
      commentData
    );
    revalidateTag("POSTS");
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
export const getSinglePost = async (postId: string) => {
  const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
    next: { tags: ["POST_ID"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export const getPosts = async () => {
  const res = await fetch("http://localhost:5000/api/posts", {
    next: { tags: ["All_POSTS"] },
  });

  return res.json();
};
