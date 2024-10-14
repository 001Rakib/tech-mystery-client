import PostCard from "@/src/components/modules/Home/PostCard";
import { getPosts } from "@/src/services/Posts";
import { IPost } from "@/src/types";

const Posts = async () => {
  const { data: posts } = await getPosts();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-3 gap-5">
        {posts.map((post: IPost) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
