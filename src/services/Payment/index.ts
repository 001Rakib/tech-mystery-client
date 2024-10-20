"use server";

import { FieldValues } from "react-hook-form";
import axios from "axios";

export const makePayment = async (paymentData: FieldValues) => {
  try {
    const { data } = await axios.post(
      "https://a6-tech-tips-server.vercel.app/api/payment",
      paymentData,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
