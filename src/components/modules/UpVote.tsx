"use client";
import { useUpVotePost } from "@/src/hooks/post.hook";
import { Button } from "@nextui-org/button";
import { UpLogo } from "../icons";
import { useUser } from "@/src/context/user.provider";
import { toast } from "sonner";
import { IPost } from "@/src/types";

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
    // console.log(upVoteData);

    upVote(upVoteData);
  };

  return (
    <Button
      onClick={() =>
        user?.email !== data?.author?.email
          ? handleUpVotePost()
          : toast.error("You can not vote your post", {
              position: "top-center",
            })
      }
      isLoading={isPending}
    >
      <UpLogo />
      {data?.upVote?.length} votes
    </Button>
  );
};

export default UpVote;
