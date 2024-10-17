"use client";
import { useUser } from "@/src/context/user.provider";
import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { Chip } from "@nextui-org/chip";
import { LockLogo, VerifiedLogo } from "../../icons";

const PostCard = ({ post }: { post: IPost }) => {
  const { user } = useUser();

  return (
    <>
      <div className="">
        <Card
          className={
            post.isPremium &&
            !user?.isPremiumMember &&
            post?.author.email !== user?.email
              ? "blur-sm h-full pb-3"
              : "h-full pb-3"
          }
        >
          {post.isPremium &&
            !user?.isPremiumMember &&
            post?.author.email !== user?.email && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="text-center">
                  <LockLogo className="w-12 h-12 text-[#1877F2] mb-4 mx-auto" />

                  <p> {user ? "Browse Premium Plans" : "Login And Read"}</p>
                </div>
              </div>
            )}
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
          <Link
            href={
              post.isPremium &&
              !user?.isPremiumMember &&
              post?.author.email !== user?.email
                ? !user
                  ? `/login`
                  : user
                  ? "/pricing"
                  : `/login?redirect=/profile`
                : `/${post._id}`
            }
          >
            <CardBody className="px-3 py-0">
              <div>
                <div>
                  {post.images.map((image) => (
                    <Image
                      key={image}
                      alt="Card background"
                      className="object-cover rounded-xl  mb-4 h-full w-full"
                      src={image}
                    />
                  ))}
                </div>

                <div>
                  <h1 className="text-3xl font-bold">{post.title}</h1>

                  <p className="text-default-500 text-sm">
                    {post.shortDescription}
                  </p>
                  <Chip className="my-2" variant="bordered">
                    {" "}
                    {post.category}{" "}
                  </Chip>
                </div>
              </div>
            </CardBody>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default PostCard;
