"use client";
import { SearchIcon } from "@/src/components/icons";
import FollowUserList from "@/src/components/modules/Home/FollowUserList";
import PostCard from "@/src/components/modules/Home/PostCard";
import useDebounce from "@/src/hooks/debounce.hook";
import { useGetPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { useState } from "react";

const NewsFeed = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const query = {
    searchTerm: debouncedSearchTerm,
    sortBy: "-createdAt",
  };

  const { data: posts, isLoading } = useGetPosts(query);

  return (
    <div className="mx-auto max-w-7xl px-6 my-2">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading && <Spinner size="md" />}
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 my-10">
        <div className="col-span-2">
          <div className="grid gap-5">
            {posts?.map((post: IPost) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
        <div className="ml-4">
          <h1 className="font-semibold text-xl">Users You Can Follow</h1>
          <FollowUserList />
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
