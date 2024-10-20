import { IPost } from "@/src/types";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Spinner } from "@nextui-org/spinner";
import { Chip } from "@nextui-org/chip";
import { useUser } from "@/src/context/user.provider";
import { useGetPosts } from "@/src/hooks/post.hook";

// Register the necessary components for Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserAnalytics = () => {
  const { user } = useUser();

  const query = {
    author: user?._id,
  };

  const { data: posts, isLoading } = useGetPosts(query);

  const [analytics, setAnalytics] = useState({
    totalReactions: 0,
    totalComments: 0,
  });

  useEffect(() => {
    if (posts) {
      let totalReactions = 0;
      let totalComments = 0;

      posts.forEach((post: IPost) => {
        // Count total reactions: upVote + downVote
        totalReactions +=
          (post.upVote?.length || 0) + (post.downVote?.length || 0);

        // Count total comments
        totalComments += post.comments?.length || 0;
      });

      setAnalytics({
        totalReactions,
        totalComments,
      });
    }
  }, [posts]);

  if (isLoading) return <Spinner size="md" />;

  // Chart Data for Reactions
  const reactionsChartData = {
    labels: posts?.map((post: IPost) => post.title), // Post titles
    datasets: [
      {
        label: "Upvotes",
        data: posts?.map((post: IPost) => post.upVote?.length || 0), // Upvotes data
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Downvotes",
        data: posts?.map((post: IPost) => post.downVote?.length || 0), // Downvotes data
        backgroundColor: "rgba(255,99,132,0.6)",
        borderColor: "rgba(255,99,132,1)",
      },
    ],
  };

  // Chart Data for Comments
  const commentsChartData = {
    labels: posts?.map((post: IPost) => post.title), // Post titles
    datasets: [
      {
        label: "Comments",
        data: posts?.map((post: IPost) => post.comments?.length || 0), // Comments data
        backgroundColor: "rgba(153,102,255,0.6)",
        borderColor: "rgba(153,102,255,1)",
      },
    ],
  };

  return (
    <div>
      <div className="flex gap-2 justify-center my-2">
        <Chip radius="sm">Total Reactions: {analytics.totalReactions}</Chip>
        <Chip radius="sm">Total Comments: {analytics.totalComments}</Chip>
      </div>

      <div className="my-4 text-center">
        <Chip radius="sm">Reactions Summary</Chip>
        <Bar data={reactionsChartData} />
      </div>

      <div className="my-4 text-center">
        <Chip radius="sm">Comments Summary</Chip>
        <Bar data={commentsChartData} />
      </div>
    </div>
  );
};

export default UserAnalytics;
