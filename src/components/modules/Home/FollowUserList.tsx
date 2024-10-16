"use client";
import { useUser } from "@/src/context/user.provider";
import { useGetUserToFollow } from "@/src/hooks/user.hook";
import { IUserResponse } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Loading from "../../UI/Loading";
import { useState } from "react";

const FollowUserList = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { user: currentUser } = useUser();
  const { data, isLoading } = useGetUserToFollow(currentUser?._id as string);
  console.log(data);

  return (
    <>
      {isLoading && <Loading />}
      {data?.data?.map((user: IUserResponse) => (
        <div key={user._id} className="my-5">
          <div className="flex gap-5">
            <Avatar radius="full" size="lg" src={user?.profileImg} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-xl font-semibold leading-none text-default-900">
                {user?.name}
              </h4>
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
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FollowUserList;
