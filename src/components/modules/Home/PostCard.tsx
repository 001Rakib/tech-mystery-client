"use client";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";

import { IPost } from "@/src/types";
import { useUser } from "@/src/context/user.provider";

import { LockLogo, VerifiedLogo } from "../../icons";
import EditPostModal from "../Post/EditPostModal";
import DeletePostModal from "../Post/DeletePostModal";

const PostCard = ({ post }: { post: IPost }) => {
  const { user } = useUser();

  // Check if the user should be blocked from viewing premium content
  const isUserBlockedFromPremium =
    post.isPremium &&
    !user?.isPremiumMember &&
    user?.email !== post.author.email;

  return (
    <>
      {/* Premium Content - Locked */}
      {isUserBlockedFromPremium ? (
        <Card>
          <Link href={user ? "/pricing" : "/login"}>
            <CardBody className="grid items-center justify-center py-24">
              <div className="text-center">
                <div className="text-[#1877F2] mb-4 ml-14">
                  <LockLogo />
                </div>
                <h1 className="font-medium text-default-600 text-xl">
                  Premium Content
                </h1>
                <p className="text-default-400">Subscribe To View</p>
              </div>
            </CardBody>
          </Link>
        </Card>
      ) : (
        <Card className="h-full pb-3 relative w-full">
          {/* Blurred Overlay for Locked Content */}
          {isUserBlockedFromPremium && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="text-center">
                <LockLogo className="w-12 h-12 text-[#1877F2] mb-4 mx-auto" />
                <p>{user ? "Browse Premium Plans" : "Login And Read"}</p>
              </div>
            </div>
          )}

          {/* Card Header */}
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={post?.author?.profileImg}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600 flex gap-1">
                  {post.author.name}
                  {post.author.isPremiumMember && <VerifiedLogo />}
                </h4>
              </div>
            </div>
          </CardHeader>

          {/* Card Body */}
          <Link
            href={
              post.isPremium &&
              !user?.isPremiumMember &&
              post?.author.email !== user?.email
                ? !user
                  ? `/login`
                  : "/pricing"
                : `/${post._id}`
            }
          >
            <CardBody className="px-0 py-0">
              <div>
                {/* Post Images */}
                <div className="w-full">
                  {post.images.map((image) => (
                    <Image
                      key={image}
                      alt="Post image"
                      className="object-cover rounded-xl mb-4 w-full h-auto"
                      height="auto"
                      src={image}
                      width="100%"
                    />
                  ))}
                </div>

                {/* Post Title and Description */}
                <div className="px-3">
                  <h1 className="text-3xl font-bold">{post.title}</h1>
                  <p className="text-default-500 text-sm">
                    {post.shortDescription}
                  </p>
                  <Chip className="my-2" variant="bordered">
                    {post.category}
                  </Chip>
                </div>
              </div>
            </CardBody>
          </Link>

          {/* Edit/Delete for Post Author */}
          {user?.email === post?.author?.email && (
            <div className="flex items-center justify-between px-3 mt-2">
              <EditPostModal post={post} />
              <DeletePostModal id={post._id} />
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default PostCard;
