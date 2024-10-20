"use server";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";
import axios from "axios";

export const updateUser = async (updateData: FieldValues, id: string) => {
  try {
    const { data } = await axios.patch(
      `https://a6-tech-tips-server.vercel.app/api/auth/user/${id}`,
      updateData,
    );

    revalidateTag("USER");

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const updateUserStatus = async (updateData: FieldValues, id: string) => {
  try {
    const { data } = await axios.patch(
      `https://a6-tech-tips-server.vercel.app/api/user/status/${id}`,
      updateData,
    );

    revalidateTag("USER");

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const followUser = async (followData: FieldValues) => {
  try {
    const { data } = await axios.patch(
      `https://a6-tech-tips-server.vercel.app/api/follow`,
      followData,
    );

    revalidateTag("FOLLOW");

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const deleteUser = async (id: string) => {
  try {
    const { data } = await axios.delete(
      `https://a6-tech-tips-server.vercel.app/api/auth/user/${id}`,
    );

    revalidateTag("USER");

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getAllUser = async () => {
  try {
    const { data } = await axios.get(
      `https://a6-tech-tips-server.vercel.app/api/auth/user`,
    );

    revalidateTag("USER");

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const getSingleUser = async (id: string) => {
  try {
    const { data } = await axios.get(
      `https://a6-tech-tips-server.vercel.app/api/auth/user/${id}`,
    );

    revalidateTag("S_USER");

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
