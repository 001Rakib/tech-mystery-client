"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import axios from "axios";

import axiosInstance from "@/src/lib/Axios";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axios.post(
      "https://a6-tech-tips-server.vercel.app/api/auth/signup",
      userData,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axios.post(
      "https://a6-tech-tips-server.vercel.app/api/auth/login",
      userData,
    );

    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const changePassword = async (newPassData: FieldValues) => {
  try {
    const { data } = await axios.patch(
      "https://a6-tech-tips-server.vercel.app/api/auth/user/change-password",
      newPassData,
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return decodedToken;
  }

  return decodedToken;
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};
