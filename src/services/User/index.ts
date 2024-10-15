"use server";
import axiosInstance from "@/src/lib/Axios";
import { FieldValues } from "react-hook-form";

export const updateUser = async (updateData: FieldValues, id: string) => {
  try {
    const { data } = await axiosInstance.patch(`/auth/user/${id}`, updateData);

    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
