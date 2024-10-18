import { IfollowersAndFollowing } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { VerifiedLogo } from "../../icons";

const MyFollowers = ({
  payload = [],
}: {
  payload: IfollowersAndFollowing[];
}) => {
  return (
    <div>
      {payload.length ? (
        payload.map((follower: IfollowersAndFollowing) => (
          <div className="flex gap-2 my-4">
            <Avatar radius="full" size="md" src={follower.profileImg} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="font-semibold leading-none text-default-900 flex gap-1">
                {follower.name}
                {follower.isPremiumMember && <VerifiedLogo />}
              </h4>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h1 className="font-medium text-xl">You Have No Followers</h1>
        </div>
      )}
    </div>
  );
};

export default MyFollowers;
