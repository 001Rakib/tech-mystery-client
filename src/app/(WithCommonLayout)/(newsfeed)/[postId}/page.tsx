"use client";

interface IProps {
  params: {
    postId: string;
  };
}
const PostDetailsPage = ({ params: { postId } }: IProps) => {
  console.log(postId);
  return (
    <div>
      <h1>Post details</h1>
    </div>
  );
};

export default PostDetailsPage;
