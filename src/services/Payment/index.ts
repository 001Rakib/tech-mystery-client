"use server";

import axiosInstance from "@/src/lib/Axios";
import { FieldValues } from "react-hook-form";

export const makePayment = async (paymentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/payment", paymentData);

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
