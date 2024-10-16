"use client";
import { VerifiedLogo } from "@/src/components/icons";
import MyFollowers from "@/src/components/modules/Profile/MyFollowers";
import MyFollowing from "@/src/components/modules/Profile/MyFollowing";
import MyPost from "@/src/components/modules/Profile/MyPost";
import ProfileEditModal from "@/src/components/modules/Profile/ProfileEditModal";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetUser } from "@/src/hooks/user.hook";

import { IUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Tab, Tabs } from "@nextui-org/tabs";

const Profile = () => {
  const { user } = useUser();
  const { data, isLoading } = useGetUser(user?.email as string);
  // console.log(data?.data?.following);
  let tabs =
    user?.role === "admin"
      ? [
          {
            id: "my-posts",
            label: "My Post",
            content: <MyPost />,
          },
          {
            id: "analytics",
            label: "Analytics",
            content:
              "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
          {
            id: "following",
            label: "Following",
            content: <MyFollowing payload={data?.data?.following} />,
          },
          {
            id: "followers",
            label: "Followers",
            content:
              "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          },

          {
            id: "users",
            label: "Manage Users",
            content:
              "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          },
        ]
      : [
          {
            id: "my-posts",
            label: "My Post",
            content: <MyPost />,
          },
          {
            id: "analytics",
            label: "Analytics",
            content:
              "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },

          {
            id: "following",
            label: "Following",
            content: <MyFollowing payload={data?.data?.following} />,
          },
          {
            id: "followers",
            label: "Followers",
            content: <MyFollowers payload={data?.data?.followers} />,
          },
        ];

  return (
    <>
      {isLoading && <Loading />}
      <div className="max-w-7xl mx-auto px-6 my-10">
        {/* user image and personal details */}
        <div className="flex gap-5">
          <Avatar radius="full" size="lg" src={data?.data?.profileImg} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-xl font-semibold leading-none text-default-900 flex gap-1">
              {data?.data?.name}
              {data?.data?.isPremiumMember && <VerifiedLogo />}
            </h4>
            <ProfileEditModal user={data?.data as IUser} />
          </div>
        </div>
        <div className="my-10 grid grid-cols-3 gap-5">
          <div className="flex w-full flex-col col-span-2">
            <Tabs aria-label="Dynamic tabs" items={tabs}>
              {(item) => (
                <Tab key={item.id} title={item.label}>
                  {item.content}
                </Tab>
              )}
            </Tabs>
          </div>
          <div>
            <p>Change Password</p>
            <p>Get Verified and Access Premium Content</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
