import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { status } from "../../responseStatus/responseStatus";

const deleteBlog = async (req: Request, res: Response) => {
  // getting data from user
  const id: string = req.body.id;
  const authorId: string = req.body.userId;

  const prisma = new PrismaClient(); // prisma client

  try {
    // find the blog using id and authorId
    const findBlog = await prisma.blog.findFirst({
      where: { id: id, authorId: authorId },
    });

    // blog is not found
    if (!findBlog) {
      res.status(status.NotFound).json({
        msg: "Blog not found",
      });
      return;
    }

    // delete the blog
    const deleteBlog = await prisma.blog.delete({
      where: { id: id, authorId: authorId },
    });

    // return the message
    res.status(status.Success).json({
      msg: "blog deleted successfully",
    });

    return;
  } catch (err) {
    res.status(status.InternalServerError).json({
      meg: "internal server error",
    });
    return;
  }
};

export default deleteBlog;
