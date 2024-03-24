import { Request, Response } from "express";

export const createBlog = (req: Request, res: Response) => {
  res.json({
    message: "Create your blog!",
  });
};
export const updateBlog = (req: Request, res: Response) => {
  res.json({
    message: "update your blog!",
  });
};
export const deleteBlog = (req: Request, res: Response) => {
  res.json({
    message: "delete your blog!",
  });
};
export const readBlog = (req: Request, res: Response) => {
  res.json({
    message: "read a blogs!",
  });
};
export const readAllBlog = (req: Request, res: Response) => {
  res.json({
    message: "read all blog!",
  });
};
