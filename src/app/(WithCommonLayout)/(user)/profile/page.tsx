"use client";
import ProfileEditModal from "@/src/components/modules/Profile/ProfileEditModal";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { getUser } from "@/src/hooks/user.hook";

import { IUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";

const Profile = () => {
  const { user } = useUser();
  const { data, isLoading } = getUser(user?.email as string);

  return (
    <>
      {isLoading && <Loading />}
      <div className="max-w-7xl mx-auto px-6 my-10">
        {/* user image and personal details */}
        <div className="flex gap-5">
          <Avatar radius="full" size="lg" src={data?.data?.profileImg} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-xl font-semibold leading-none text-default-900">
              {data?.data?.name}
            </h4>
            <ProfileEditModal user={data?.data as IUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
