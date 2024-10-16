"use server";
import axiosInstance from "@/src/lib/Axios";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const updateUser = async (updateData: FieldValues, id: string) => {
  try {
    const { data } = await axiosInstance.patch(`/auth/user/${id}`, updateData);
    revalidateTag("USER");
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
export const followUser = async (followData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(`/follow`, followData);
    revalidateTag("FOLLOW");
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
