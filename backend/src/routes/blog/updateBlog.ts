import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { status } from "../../responseStatus/responseStatus";

const updateBlog = async (req: Request, res: Response) => {
  const id: string = req.body.id;
  const title: string = req.body.title;
  const content: string = req.body.content;
  const authorId: string = req.body.userId;
  const prisma = new PrismaClient();

  try {
    const findBlog = await prisma.blog.findFirst({
      where: { id: id, authorId: authorId },
    });
    if (!findBlog) {
      res.status(status.NotFound).json({
        msg: "Blog not found",
      });
      return;
    }
    const updateBlog = await prisma.blog.update({
      where: { id: id, authorId: authorId },
      data: {
        title: title,
        content: content,
      },
    });

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
