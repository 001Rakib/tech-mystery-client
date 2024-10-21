"use server";
import axios from "axios";
import { FieldValues } from "react-hook-form";

export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await axios.post(
      "https://a6-tech-tips-server.vercel.app/api/posts",
      postData,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const editPost = async (postData: FieldValues) => {
  try {
    const { data } = await axios.patch(
      `https://a6-tech-tips-server.vercel.app/api/posts/${postData.id}`,
      postData,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const deletePost = async (id: string) => {
  try {
    const { data } = await axios.delete(
      `https://a6-tech-tips-server.vercel.app/api/posts/${id}`,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const upVotePost = async (upVoteData: FieldValues) => {
  try {
    const { data } = await axios.patch(
      "https://a6-tech-tips-server.vercel.app/api/posts/upVote",
      upVoteData,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const downVotePost = async (downVoteData: FieldValues) => {
  try {
    const { data } = await axios.patch(
      "https://a6-tech-tips-server.vercel.app/api/posts/downVote",
      downVoteData,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const commentOnPost = async (commentData: FieldValues) => {
  try {
    const { data } = await axios.put(
      "https://a6-tech-tips-server.vercel.app/api/posts/comment",
      commentData,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const editComment = async (commentData: FieldValues) => {
  try {
    const { data } = await axios.patch(
      "https://a6-tech-tips-server.vercel.app/api/posts/edit-comment",
      commentData,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const deleteComment = async (deleteData: FieldValues) => {
  try {
    const { data } = await axios.delete(
      `https://a6-tech-tips-server.vercel.app/api/posts/delete-comment`,
      {
        params: deleteData,
      },
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getSinglePost = async (postId: string) => {
  const res = await fetch(
    `https://a6-tech-tips-server.vercel.app/api/posts/${postId}`,
    {
      next: { tags: ["POST_ID"] },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
