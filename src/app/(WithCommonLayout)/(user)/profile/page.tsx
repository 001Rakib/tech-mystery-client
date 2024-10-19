"use client";
import { CameraIcon, VerifiedLogo } from "@/src/components/icons";
import ManageUsers from "@/src/components/modules/Profile/ManageUsers";
import MyFollowers from "@/src/components/modules/Profile/MyFollowers";
import MyFollowing from "@/src/components/modules/Profile/MyFollowing";
import MyPost from "@/src/components/modules/Profile/MyPost";
import ProfileEditModal from "@/src/components/modules/Profile/ProfileEditModal";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetSingleUser, useUpdateUser } from "@/src/hooks/user.hook";

import { IUser } from "@/src/types";
import { uploadImage } from "@/src/utils/uploadImage";
import { Avatar } from "@nextui-org/avatar";
import { Tab, Tabs } from "@nextui-org/tabs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

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

  const handleProfilePictureChange: SubmitHandler<FieldValues> = async (
    data
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
      </div>
    </>
  );
};

export default Profile;
