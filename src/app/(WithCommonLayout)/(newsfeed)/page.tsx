"use client";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { SearchIcon } from "@/src/components/icons";
import FollowUserList from "@/src/components/modules/Home/FollowUserList";
import PostCard from "@/src/components/modules/Home/PostCard";
import { categoryField } from "@/src/constant";
import useDebounce from "@/src/hooks/debounce.hook";
import { useGetPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";

const NewsFeed = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [FilterCategory, setFilterCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const limit = 3;
  const query = {
    searchTerm: debouncedSearchTerm,
    sortBy: "-createdAt",
    category: FilterCategory || undefined,
    page,
    limit,
  };

  const { data: posts, isLoading } = useGetPosts(query);

  useEffect(() => {
    if (posts && page === 1) {
      setAllPosts(posts); // Set fresh posts on first page load
    } else if (posts) {
      setAllPosts((prev) => [...prev, ...posts]); // Append posts on subsequent pages
    }
  }, [posts]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
        onChange={(e) => {
          setPage(1);
          setSearchTerm(e.target.value);
        }}
      />

      <div className="my-4 flex gap-2 flex-wrap">
        <Chip
          className="hover:cursor-pointer"
          color={!FilterCategory ? "primary" : "default"}
          variant="flat"
          onClick={() => {
            setPage(1);
            setFilterCategory("");
          }}
        >
          Latest
        </Chip>

        {categoryField?.map((category, indx) => (
          <div key={indx}>
            <Chip
              className="hover:cursor-pointer"
              color={FilterCategory === category.key ? "primary" : "default"}
              variant="flat"
              onClick={() => {
                setPage(1);
                setFilterCategory(
                  category.key === FilterCategory ? "" : category.key,
                );
              }}
            >
              {category.label}
            </Chip>
          </div>
        ))}
      </div>

      {isLoading && page === 1 && <Spinner size="md" />}
      <InfiniteScroll
        dataLength={allPosts.length}
        endMessage={
          <p className="font-semibold text-default-700 text-xl">
            No more posts to show
          </p>
        }
        hasMore={!!posts?.length}
        loader={<Spinner size="md" />}
        next={fetchMoreData}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-4 my-4">
          <div className="col-span-2">
            <div className="grid gap-5">
              {allPosts?.map((post: IPost) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
          <div className="ml-4">
            <h1 className="font-semibold text-xl">Users You Can Follow</h1>
            <FollowUserList />
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default NewsFeed;
