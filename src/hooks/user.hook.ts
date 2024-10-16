import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { followUser, updateUser } from "../services/User";
import { toast } from "sonner";
import { useUser } from "../context/user.provider";
import axios from "axios";

export const useGetUser = (email: string) => {
  return useQuery({
    queryKey: ["USER"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/api/auth/user/${email}`
      );
      return response.data; // Return the data from the response
    },
  });
};
export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["USER"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/api/auth/user`);
      return response.data; // Return the data from the response
    },
  });
};
export const useGetUserToFollow = (id: string) => {
  return useQuery({
    queryKey: ["FOLLOW"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/api/follow?id=${id}`
      );
      return response.data; // Return the data from the response
    },
  });
};

export const useUpdateUser = () => {
  const { user } = useUser();

  return useMutation<any, Error, FieldValues, string>({
    mutationKey: ["USER"],
    mutationFn: async (updateData) =>
      await updateUser(updateData, user?._id as string),
    onSuccess: () => {
      toast.success("User Updated successfully", { position: "top-center" });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useFollowUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FOLLOW"],
    mutationFn: async (followData) => await followUser(followData),
    onSuccess: () => {
      toast.success("Followed successfully", { position: "top-center" });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
