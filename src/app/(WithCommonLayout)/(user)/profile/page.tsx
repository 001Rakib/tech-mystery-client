"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Tab, Tabs } from "@nextui-org/tabs";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { CameraIcon, VerifiedLogo } from "@/src/components/icons";
import Analytics from "@/src/components/modules/Profile/Admin/Analytics";
import ManageUsers from "@/src/components/modules/Profile/Admin/ManageUsers";
import ChangePasswordModal from "@/src/components/modules/Profile/ChangePasswordModal";
import MyFollowers from "@/src/components/modules/Profile/MyFollowers";
import MyFollowing from "@/src/components/modules/Profile/MyFollowing";
import MyPost from "@/src/components/modules/Profile/MyPost";
import ProfileEditModal from "@/src/components/modules/Profile/ProfileEditModal";
import UserAnalytics from "@/src/components/modules/Profile/UserAnalytics";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetSingleUser, useUpdateUser } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
import { uploadImage } from "@/src/utils/uploadImage";

const Profile = () => {
  const { user } = useUser();
  const { register, handleSubmit } = useForm();
  const { data, isLoading } = useGetSingleUser(user?._id as string);

  const { mutate: changeProfileImg, isPending } = useUpdateUser();

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
            content: <Analytics />,
          },
          {
            id: "following",
            label: "Following",
            content: <MyFollowing payload={data?.following} />,
          },
          {
            id: "followers",
            label: "Followers",
            content: <MyFollowers payload={data?.followers} />,
          },

          {
            id: "users",
            label: "Manage Users",
            content: <ManageUsers />,
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
            content: <UserAnalytics />,
          },

          {
            id: "following",
            label: "Following",
            content: <MyFollowing payload={data?.following} />,
          },
          {
            id: "followers",
            label: "Followers",
            content: <MyFollowers payload={data?.followers} />,
          },
        ];

  const handleProfilePictureChange: SubmitHandler<FieldValues> = async (
    data,
  ) => {
    const imageUrl = await uploadImage(data.profileImg[0]);

    const postData = {
      profileImg: imageUrl?.data.url,
    };

    changeProfileImg(postData);
  };

  return (
    <>
      {isLoading && <Loading />}
      {isPending && <Loading />}
      <div className="max-w-7xl mx-auto px-6 my-10">
        {/* user image and personal details */}

        <div className="lg:order-2 lg:col-span-1 order-1">
          <div>
            <div className="relative group">
              <Avatar
                alt={data?.name}
                className="w-24 h-24 mb-3 mt-4"
                src={data?.profileImg}
              />

              {user && (
                <>
                  <label
                    className="absolute w-24 inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-100 transition-opacity duration-300 cursor-pointer rounded-full"
                    htmlFor="profile-picture"
                  >
                    {/* <span className="text-white">Change</span> */}
                    <CameraIcon />
                  </label>
                  <form onChange={handleSubmit(handleProfilePictureChange)}>
                    <input
                      accept="image/*"
                      className="hidden"
                      id="profile-picture"
                      type="file"
                      {...register("profileImg")}
                    />
                  </form>
                </>
              )}
            </div>
            <div>
              <h1 className="font-semibold text-xl text-default-800 flex gap-1 items-center">
                {data?.name}
                {data?.isPremiumMember && <VerifiedLogo />}
              </h1>
              <ProfileEditModal user={data as IUser} />
            </div>
            <div>
              <ChangePasswordModal />
              {!data?.isPremiumMember && (
                <Link href={"/pricing"}>
                  {" "}
                  <Button
                    className="my-2"
                    color="primary"
                    size="sm"
                    variant="bordered"
                  >
                    Get Verified and Access Premium Content
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="my-10 grid lg:grid-cols-3">
            <div className="flex flex-wrap w-full md:flex-col md:col-span-2">
              <div className="w-full overflow-x-auto">
                <Tabs
                  aria-label="Dynamic tabs"
                  className="flex-nowrap"
                  items={tabs}
                >
                  {(item) => (
                    <Tab key={item.id} title={item.label}>
                      {item.content}
                    </Tab>
                  )}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
