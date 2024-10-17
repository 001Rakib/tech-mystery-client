"use client";
import { useDownVotePost } from "@/src/hooks/post.hook";
import { Button } from "@nextui-org/button";
import { DownLogo } from "../../icons";
import { useUser } from "@/src/context/user.provider";
import { toast } from "sonner";
import { IPost } from "@/src/types";

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
      onClick={() =>
        user?.email !== data?.author?.email
          ? handleDownVotePost()
          : toast.error("You can not vote your post", {
              position: "top-center",
            })
      }
      isLoading={isPending}
    >
      <DownLogo />
      {data?.downVote?.length} votes
    </Button>
  );
};

export default DownVote;
