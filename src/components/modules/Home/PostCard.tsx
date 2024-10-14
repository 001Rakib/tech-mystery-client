"use client";
import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useState } from "react";
import { DownLogo, UpLogo } from "../../icons";

const PostCard = ({ post }: { post: IPost }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <div>
      <Card className="max-w-[340px]">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src={post?.authorImage}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {post.author}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                Category: {post.category}
              </h5>
            </div>
          </div>
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <p>{post.title}</p>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={post.image}
            width={270}
          />
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <Button>
              {" "}
              <UpLogo /> Up Vote
            </Button>
          </div>
          <div className="flex gap-1">
            <Button>
              {" "}
              <DownLogo /> Down Vote
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
