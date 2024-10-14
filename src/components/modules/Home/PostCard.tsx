"use client";
import { useUser } from "@/src/context/user.provider";
import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useState } from "react";

const PostCard = ({ post }: { post: IPost }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const { user } = useUser();

  return (
    <div>
      <Card className="h-full">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src={post?.author?.profileImg}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {post.author.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                Category: {post.category}
              </h5>
            </div>
          </div>

          {user?.email === post?.author?.email ? (
            ""
          ) : (
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
          )}
        </CardHeader>
        <CardBody className="px-3 py-0">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          {/* <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.description }}
          /> */}
          <p className="text-default-500 text-sm">{post.shortDescription}</p>

          {post.images.map((image) => (
            <Image
              alt="Card background"
              className="object-cover rounded-xl mt-4 mb-6"
              src={image}
              width={270}
            />
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default PostCard;
