import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { status } from "../../responseStatus/responseStatus";

const readBlog = async (req: Request, res: Response) => {
  // Get id from url params
  const id: string = req.params.id;

  const prisma = new PrismaClient(); // prisma client

  try {
    // retrieve blog
    const blog = await prisma.blog.findFirst({
      where: { id: id },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    // return blog
    res.status(status.Success).json({
      msg: "read the blog!",
      blog,
    });

    return;
  } catch (err) {
    res.status(status.InternalServerError).json({
      msg: "internal server error",
    });
    return;
  }
};

export default readBlog;
