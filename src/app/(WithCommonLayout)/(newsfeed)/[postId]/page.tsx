"use client";
import {
  CommentLogo,
  PdfLogo,
  ShareLogo,
  VerifiedLogo,
} from "@/src/components/icons";
import DownVote from "@/src/components/modules/DownVote";
import UpVote from "@/src/components/modules/UpVote";
import Loading from "@/src/components/UI/Loading";
import { useGetPosts } from "@/src/hooks/post.hook";
import { getSinglePost } from "@/src/services/Posts";
import { Avatar } from "@nextui-org/avatar";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { useRef } from "react";
import generatePDF from "react-to-pdf";

interface IProps {
  params: {
    postId: string;
  };
}
const PostDetailsPage = ({ params: { postId } }: IProps) => {
  const query = `_id=${postId}`;

  const { data, isLoading } = useGetPosts(query);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const postData = data ? data[0] : null;

  return (
    <>
      {isLoading && <Loading />}
      <div ref={targetRef} className="max-w-7xl mx-auto px-6 my-5" id="content">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={postData?.author?.profileImg}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600 flex gap-1">
              {postData?.author.name}
              {postData?.author.isPremiumMember && <VerifiedLogo />}
            </h4>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-4xl my-2"> {postData?.title} </h1>
          <p className="text-justify"> {postData?.shortDescription} </p>
        </div>
        <div className="my-2">
          {postData?.images.map((image: string) => (
            <Image
              key={image}
              alt="Card background"
              className="object-cover rounded-xl  mb-4 h-full w-full"
              src={image}
            />
          ))}
        </div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: postData?.description }}
        />

        <div>
          <ButtonGroup>
            <UpVote data={postData} />
            <DownVote data={postData} />

            <Button>
              {" "}
              <CommentLogo />
              Comment
            </Button>
            <Button>
              {" "}
              <ShareLogo /> Share
            </Button>
            <Button
              onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}
            >
              {" "}
              <PdfLogo /> Save as PDF
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default PostDetailsPage;
