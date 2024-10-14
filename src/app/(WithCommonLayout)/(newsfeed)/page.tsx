import PostCard from "@/src/components/modules/Home/PostCard";
import { getPosts } from "@/src/services/Posts";
import { IPost } from "@/src/types";

const NewsFeed = async () => {
  const { data: posts } = await getPosts();

  return (
    <div className="mx-auto max-w-7xl px-6 my-10">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {posts?.map((post: IPost) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <div className="ml-4">
          <h1 className="font-semibold text-xl">Users You Can Follow</h1>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
