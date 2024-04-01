import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { status } from "../../responseStatus/responseStatus";

const deleteBlog = async (req: Request, res: Response) => {
  const id: string = req.body.id;
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

    const deleteBlog = await prisma.blog.delete({
      where: { id: id, authorId: authorId },
    });

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
