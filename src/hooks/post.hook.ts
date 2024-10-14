import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createPost, getPosts } from "../services/Posts";
import { toast } from "sonner";

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
// export const useGetPosts = () => {
//   return useQuery({
//     queryKey: ["GET_POSTS"],
//     queryFn: async () => await getPosts(),
//   });
// };
