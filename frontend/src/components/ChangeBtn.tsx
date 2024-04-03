import axios from "axios";
import { API_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { updateBlogType } from "../types";

export const Delete = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const sendRequest = async () => {
    try {
      const data = {
        id: id,
      };
      const response = await axios.delete(`${API_URL}/api/v1/blog`, {
        data,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      navigate("/blogs");
    } catch (err) {
      alert("Can't delete");
    }
  };
  return (
    <div>
      <Link to={"/blogs"}>
        <button
          onClick={sendRequest}
          type="button"
          className=" text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2 text-center me-2"
        >
          Delete
        </button>
      </Link>
    </div>
  );
};

export const Update = ({ id, title, content }: updateBlogType) => {
  return (
    <div>
      <Link to={"/updateBlog"}>
        <button
          onClick={() => {
            localStorage.setItem("blogId", id);
            localStorage.setItem("blogTitle", title);
            localStorage.setItem("blogContent", content);
          }}
          type="button"
          className=" text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2 text-center me-2"
        >
          Update
        </button>
      </Link>
    </div>
  );
};
