import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createPost } from "../services/Posts";
import { toast } from "sonner";
import axios from "axios";
import envConfig from "../config/envConfig";

export const useCreatePost = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POSTS"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully", { position: "top-center" });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useGetPosts = (query: string) => {
  return useQuery({
    queryKey: ["POSTS", query],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/api/posts?${query}`
      );
      return response.data.data; // Return the data from the response
    },
  });
};
