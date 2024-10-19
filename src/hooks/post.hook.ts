import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  commentOnPost,
  createPost,
  deleteComment,
  downVotePost,
  editComment,
  upVotePost,
} from "../services/Posts";
import { toast } from "sonner";
import axios from "axios";
import qs from "qs";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ALL_POSTS"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["ALL_POSTS"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useUpVotePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POSTS"],
    mutationFn: async (upVoteData) => await upVotePost(upVoteData),
    onSuccess: () => {
      // Invalidate the 'POSTS' query so that it refetches the posts
      queryClient.invalidateQueries({ queryKey: ["POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useDownVotePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POSTS"],
    mutationFn: async (downVoteData) => await downVotePost(downVoteData),
    onSuccess: () => {
      // Invalidate the 'POSTS' query so that it refetches the posts
      queryClient.invalidateQueries({ queryKey: ["POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useCommentONPost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POSTS"],
    mutationFn: async (commentData) => await commentOnPost(commentData),
    onSuccess: () => {
      toast.success("Comment Posted Successfully", { position: "top-center" });
      // Invalidate the 'POSTS' query so that it refetches the posts
      queryClient.invalidateQueries({ queryKey: ["POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useEditComment = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POSTS"],
    mutationFn: async (commentData) => await editComment(commentData),
    onSuccess: () => {
      toast.success("Comment Edited Successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["POSTS"],
    mutationFn: async (deleteData) => await deleteComment(deleteData),
    onSuccess: () => {
      toast.success("Comment deleted Successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["POSTS"] });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
export const useGetPosts = (query: {
  category?: string;
  author?: string;
  searchTerm?: string;
  sortBY?: string;
  isPremiumContent?: boolean;
  topic?: string;
  _id?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["POSTS", query],
    queryFn: async () => {
      const queryString = qs.stringify(query, {
        addQueryPrefix: true,
        skipNulls: true,
      });

      const response = await axios.get(
        `http://localhost:5000/api/posts${queryString}`
      );

      return response.data.data;
    },
  });
};
