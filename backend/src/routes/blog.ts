import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { status } from "../responseStatus/responseStatus";

export const createBlog = async (req: Request, res: Response) => {
  const title: string = req.body.title;
  const content: string = req.body.content;
  const prisma = new PrismaClient();

  try {
    const createBlog = await prisma.blog.create({
      data: {
        title: title,
        content: content,
        authorId: req.body.userId,
      },
    });

    res.status(status.Success).json({
      message: "Blog created successfully",
      id: createBlog.id,
      title: createBlog.title,
      content: createBlog.content,
    });
    return;
  } catch (err) {
    res.status(status.InternalServerError).json({
      message: "internal server error",
    });
    return;
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const id: string = req.body.id;
  const title: string = req.body.title;
  const content: string = req.body.content;
  const prisma = new PrismaClient();

  try {
    const updateBlog = await prisma.blog.update({
      where: { id: id },
      data: {
        title: title,
        content: content,
      },
    });

    res.status(status.Success).json({
      message: "Blog update successfully",
      id: updateBlog.id,
      title: updateBlog.title,
      content: updateBlog.content,
    });
    return;
  } catch (err) {
    res.status(status.InternalServerError).json({
      message: "internal server error",
    });
    return;
  }
};

export const deleteBlog = (req: Request, res: Response) => {
  res.json({
    message: "delete your blog!",
  });
};

export const readBlog = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const prisma = new PrismaClient();

  try {
    const blog = await prisma.blog.findFirst({
      where: { id: id },
    });

    res.status(status.Success).json({
      message: "read the blog!",
      blog,
    });
    return;
  } catch (err) {
    res.status(status.InternalServerError).json({
      message: "internal server error",
    });
    return;
  }
};

export const readAllBlog = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    const blogs = await prisma.blog.findMany();

    res.status(status.Success).json({
      message: "read all blogs",
      blogs,
    });
    return;
  } catch (err) {
    res.status(status.InternalServerError).json({
      message: "internal server error",
    });
    return;
  }
};
