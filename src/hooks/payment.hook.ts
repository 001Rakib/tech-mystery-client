import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { makePayment } from "../services/Payment";

export const useMakePayment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_SIGNUP"],
    mutationFn: async (paymentData) => await makePayment(paymentData),
    onSuccess: () => {
      toast.success("Payment successful", { position: "top-center" });
      queryClient.invalidateQueries({
        queryKey: ["POSTS", "ALL_POST", "USER"],
      });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
};
