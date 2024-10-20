import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  changePassword,
  loginUser,
  registerUser,
} from "../services/AuthService";

export const useUserSignup = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_SIGNUP"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User created successfully", { position: "top-center" });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASS"],
    mutationFn: async (userData) => await changePassword(userData),
    onSuccess: () => {
      toast.success("Password Changed successfully", {
        position: "top-center",
      });
    },
    onError: () => {
      toast.error("Something went wrong, Please Try again", {
        position: "top-center",
      });
    },
  });
};
export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User Logged in successfully", { position: "top-center" });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
