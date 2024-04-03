import { useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useBlog } from "../hooks";
import BlogRead from "../components/BlogRead";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return <div>Loading . . . . </div>;
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center flex-col items-center mt-10">
        <BlogRead
          id={blog.id}
          username={blog.author.username}
          title={blog.title}
          content={blog.content}
        />
      </div>
    </div>
  );
};

export default Blog;
