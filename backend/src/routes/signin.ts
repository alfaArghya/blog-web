import { Request, Response } from "express";

const signin = (req: Request, res: Response) => {
  res.json({
    message: "Hello user!",
  });
};

export default signin;
