import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { status } from "../../responseStatus/responseStatus";

const readAllBlog = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const blogs = await prisma.blog.findMany();

    res.status(status.Success).json({
      msg: "read all blogs",
      blogs,
    });
    return;
  } catch (err) {
    res.status(status.InternalServerError).json({
      msg: "internal server error",
    });
    return;
  }
};

export default readAllBlog;
