import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { status } from "../../responseStatus/responseStatus";
import { createBlogInput } from "../../types";

const createBlog = async (req: Request, res: Response) => {
  //getting data from user
  const title: string = req.body.title;
  const content: string = req.body.content;
  const authorId: string = req.body.userId;

  const prisma = new PrismaClient(); //prisma client

  //checking all data for correct format
  const { success } = createBlogInput.safeParse({
    title,
    content,
  });

  //all data is not in correct format -> so can't Create Blog
  if (!success) {
    res.status(status.InvalidInput).json({ msg: "Invalid inputs" });
    return;
  }

  try {
    // create blog
    const createBlog = await prisma.blog.create({
      data: {
        title: title,
        content: content,
        authorId: authorId,
      },
    });

    // return blog data
    res.status(status.Success).json({
      msg: "Blog created successfully",
      id: createBlog.id,
      title: createBlog.title,
      content: createBlog.content,
    });
    return;
  } catch (err) {
    res.status(status.InternalServerError).json({
      msg: "internal server error",
      err: err,
    });
    return;
  }
};

export default createBlog;
