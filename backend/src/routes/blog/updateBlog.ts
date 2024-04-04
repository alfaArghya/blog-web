import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { status } from "../../responseStatus/responseStatus";
import { updateBlogInput } from "../../types";

const updateBlog = async (req: Request, res: Response) => {
  // getting data from user
  const id: string = req.body.id;
  const title: string = req.body.title;
  const content: string = req.body.content;
  const authorId: string = req.body.userId;

  const prisma = new PrismaClient(); // prisma client

  //checking all data for correct format
  const { success } = updateBlogInput.safeParse({
    id,
    title,
    content,
  });

  //all data is not in correct format -> so can't update Blog
  if (!success) {
    res.status(status.InvalidInput).json({ msg: "Invalid inputs" });
    return;
  }

  try {
    // find the blog using id and authorId
    const findBlog = await prisma.blog.findFirst({
      where: { id: id, authorId: authorId },
    });

    // blog not found
    if (!findBlog) {
      res.status(status.NotFound).json({
        msg: "Blog not found",
      });
      return;
    }

    // update the blog
    const updateBlog = await prisma.blog.update({
      where: { id: id, authorId: authorId },
      data: {
        title: title,
        content: content,
      },
    });

    //return the updated blog
    res.status(status.Success).json({
      msg: "Blog update successfully",
      id: updateBlog.id,
      title: updateBlog.title,
      content: updateBlog.content,
    });
    return;
  } catch (err) {
    res.status(status.InternalServerError).json({
      msg: "internal server error",
    });
    return;
  }
};

export default updateBlog;
