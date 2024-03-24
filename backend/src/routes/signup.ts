import { Request, Response } from "express";

const signup = (req: Request, res: Response) => {
  res.json({
    message: "Hello user! First sign up",
  });
};

export default signup;
