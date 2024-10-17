import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createPost, downVotePost, upVotePost } from "../services/Posts";
import { toast } from "sonner";
import axios from "axios";

export const useCreatePost = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POSTS"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully", { position: "top-center" });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useUpVotePost = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POSTS_ID"],
    mutationFn: async (upVoteData) => await upVotePost(upVoteData),
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useDownVotePost = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POSTS_ID"],
    mutationFn: async (downVoteData) => await downVotePost(downVoteData),
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useGetPosts = (query: string) => {
  return useQuery({
    queryKey: ["POSTS"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/api/posts?${query}`
      );

      return response.data.data; // Return the data from the response
    },
  });
};
