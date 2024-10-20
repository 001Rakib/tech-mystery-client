"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";

import { useUser } from "@/src/context/user.provider";
import { useFollowUser, useGetUserToFollow } from "@/src/hooks/user.hook";
import { IUserResponse } from "@/src/types";

import Loading from "../../UI/Loading";
import { VerifiedLogo } from "../../icons";

const FollowUserList = () => {
  const { user: currentUser } = useUser();
  const { data, isLoading } = useGetUserToFollow(currentUser?._id as string);
  const { mutate: followUser, isPending } = useFollowUser();

  const handleFollow = (id: string) => {
    const followData = {
      follower: currentUser?._id,
      following: id,
    };

    followUser(followData);
  };

  return (
    <>
      {isLoading && <Loading />}
      {data?.data?.length ? (
        data?.data?.map((user: IUserResponse) => (
          <div key={user._id} className="my-5">
            <div className="flex gap-5">
              <Avatar radius="full" size="lg" src={user?.profileImg} />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-xl font-semibold leading-none text-default-900 flex gap-1">
                  {user?.name}
                  {user?.isPremiumMember && <VerifiedLogo />}
                </h4>
                <Button
                  className=""
                  color="primary"
                  isLoading={isPending}
                  radius="full"
                  size="sm"
                  onClick={() => handleFollow(user._id)}
                >
                  Follow
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>Login to see</>
      )}
    </>
  );
};

export default FollowUserList;
