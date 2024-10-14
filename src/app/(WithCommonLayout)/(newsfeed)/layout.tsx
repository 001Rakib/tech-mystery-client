import { ReactNode } from "react";

const layout = ({
  children,
  posts,
}: {
  children: ReactNode;
  posts: ReactNode;
}) => {
  return (
    <div>
      {children}
      {posts}
    </div>
  );
};

export default layout;
