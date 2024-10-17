import {
  CommentLogo,
  PdfLogo,
  ShareLogo,
  VerifiedLogo,
} from "@/src/components/icons";
import DownVote from "@/src/components/modules/DownVote";
import UpVote from "@/src/components/modules/UpVote";
import { getSinglePost } from "@/src/services/Posts";
import { Avatar } from "@nextui-org/avatar";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

interface IProps {
  params: {
    postId: string;
  };
}
const PostDetailsPage = async ({ params: { postId } }: IProps) => {
  const { data } = await getSinglePost(postId);

  return (
    <div className="max-w-7xl mx-auto px-6 my-5">
      <div className="flex gap-5">
        <Avatar
          isBordered
          radius="full"
          size="md"
          src={data?.author?.profileImg}
        />
        <div className="flex flex-col gap-1 items-start justify-center">
          <h4 className="text-small font-semibold leading-none text-default-600 flex gap-1">
            {data?.author.name}
            {data?.author.isPremiumMember && <VerifiedLogo />}
          </h4>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-4xl my-2"> {data?.title} </h1>
        <p className="text-justify"> {data?.shortDescription} </p>
      </div>
      <div className="my-2">
        {data?.images.map((image: string) => (
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
        dangerouslySetInnerHTML={{ __html: data?.description }}
      />

      <div>
        <ButtonGroup>
          <UpVote data={data} />
          <DownVote data={data} />

          <Button>
            {" "}
            <CommentLogo />
            Comment
          </Button>
          <Button>
            {" "}
            <ShareLogo /> Share
          </Button>
          <Button>
            {" "}
            <PdfLogo /> Save as PDF
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default PostDetailsPage;
