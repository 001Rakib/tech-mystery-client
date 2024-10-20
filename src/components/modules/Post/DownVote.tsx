"use client";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

import { useUser } from "@/src/context/user.provider";
import { useDownVotePost } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";

import { DownLogo } from "../../icons";

const DownVote = ({ data }: { data: IPost }) => {
  const { user } = useUser();

  const { mutate: downVote, isPending } = useDownVotePost();

  const handleDownVotePost = () => {
    if (!user) {
      toast.error("Please Login to Vote");
    }

    const downVoteData = {
      postId: data?._id,
      user: user?._id,
    };

    downVote(downVoteData);
  };

  return (
    <Button
      isLoading={isPending}
      onClick={() =>
        user?.email !== data?.author?.email
          ? handleDownVotePost()
          : toast.error("You can not vote your post", {
              position: "top-center",
            })
      }
    >
      <DownLogo />
      {data?.downVote?.length} votes
    </Button>
  );
};

export default DownVote;
