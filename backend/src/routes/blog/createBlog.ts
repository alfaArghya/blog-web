import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { status } from "../../responseStatus/responseStatus";

const createBlog = async (req: Request, res: Response) => {
  const title: string = req.body.title;
  const content: string = req.body.content;
  const authorId: string = req.body.userId;
  const prisma = new PrismaClient();

  try {
    const createBlog = await prisma.blog.create({
      data: {
        title: title,
        content: content,
        authorId: authorId,
      },
    });

    console.log(createBlog);

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
