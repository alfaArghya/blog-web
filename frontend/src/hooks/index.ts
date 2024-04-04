import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { BlogType } from "../types";

//custom hook for retrieving all blogs
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/blog/all`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  return {
    loading,
    blogs,
  };
};

//custom hook for retrieving blog
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogType>();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      })
      .catch((err) => {});
  }, [id]);

  return {
    loading,
    blog,
  };
};
