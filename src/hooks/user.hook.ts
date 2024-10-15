import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { updateUser } from "../services/User";
import { toast } from "sonner";
import { useUser } from "../context/user.provider";

export const useUpdateUser = () => {
  const { user } = useUser();

  return useMutation<any, Error, FieldValues, string>({
    mutationKey: ["USER_SIGNUP"],
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
