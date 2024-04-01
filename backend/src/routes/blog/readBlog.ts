import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { status } from "../../responseStatus/responseStatus";

const readBlog = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const prisma = new PrismaClient();

  try {
    const blog = await prisma.blog.findFirst({
      where: { id: id },
    });

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
