import { useUser } from "@/src/context/user.provider";
import { useGetPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import PostCard from "../Home/PostCard";
import Loading from "../../UI/Loading";

const MyPost = () => {
  const { user } = useUser();

  const query = `author=${user?._id}`;

  const { data, isLoading } = useGetPosts(query);

  return (
    <>
      {isLoading && <Loading />}
      <div className="">
        <div className="">
          <div className="grid gap-5">
            {data?.map((post: IPost) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPost;
