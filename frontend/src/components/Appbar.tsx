import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

const Appbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  return (
    <div className="border-b border-gray-200 flex justify-between px-10 py-4">
      <Link to={"/blogs"}>
        <h1 className="font-black text-4xl">Blog-Web</h1>
      </Link>
      <div className="w-64 flex justify-between items-center">
        <Link to={"/createBlog"}>
          <button
            type="button"
            className=" text-white bg-[#2ec27d] hover:bg-[#2ec27d]/60 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2 text-center me-2"
          >
            Create
          </button>
        </Link>
        <div className="flex items-center">
          <Avatar username={username || "anonymous"} />
          <button
            type="button"
            className=" text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2 text-center me-2"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
