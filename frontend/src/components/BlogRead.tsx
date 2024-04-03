import { BlogCardType } from "../types";
import Avatar from "./Avatar";
import { Delete, Update } from "./ChangeBtn";

const BlogRead = ({ username, id, title, content }: BlogCardType) => {
  return (
    <div className="grid grid-cols-12 w-full px-10 pt-5 max-w-screen-2xl">
      <div className="col-span-8">
        <div className="text-2xl font-extrabold mb-5">{title}</div>
        <div className="text-xl">{content}</div>
      </div>
      <div className="col-span-4 ml-6">
        <div className="mb-2">Author</div>
        <div className="mb-10">
          <div className="flex">
            <Avatar username={username} />
            <div className="font-bold text-gray-600">@{username}</div>
          </div>
          <div className=" text-gray-400 ">Hii I am a user of Blog-Web</div>
        </div>
        <div>
          {username === localStorage.getItem("username") ? (
            <div className="flex ">
              <Update id={id} title={title} content={content} />
              <Delete id={id} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogRead;
