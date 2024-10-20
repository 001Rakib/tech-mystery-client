"use client";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

import { useUpVotePost } from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import { IPost } from "@/src/types";

import { UpLogo } from "../../icons";

const UpVote = ({ data }: { data: IPost }) => {
  const { user } = useUser();

  const { mutate: upVote, isPending } = useUpVotePost();

  const handleUpVotePost = () => {
    if (!user) {
      toast.error("Please Login to Vote");
    }

    const upVoteData = {
      postId: data?._id,
      user: user?._id,
    };
    // (upVoteData);

    upVote(upVoteData);
  };

  return (
    <Button
      isLoading={isPending}
      onClick={() =>
        user?.email !== data?.author?.email
          ? handleUpVotePost()
          : toast.error("You can not vote your post", {
              position: "top-center",
            })
      }
    >
      <UpLogo />
      {data?.upVote?.length} votes
    </Button>
  );
};

export default UpVote;
