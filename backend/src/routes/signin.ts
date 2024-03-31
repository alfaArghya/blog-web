import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as argon2 from "argon2";
import { status } from "../responseStatus/responseStatus";

const prisma = new PrismaClient();
dotenv.config();

const signin = async (req: Request, res: Response) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      res.status(status.Forbidden).json({
        message: "Invalid username",
      });
      return;
    }

    if (!(await argon2.verify(user.password, password))) {
      res.status(status.Forbidden).json({
        msg: "Incorrect password",
      });
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      `${process.env.JWT_Secret}`
    );

    res.json({
      message: "Hello user!",
      token,
    });
  } catch (err) {}
};

export default signin;
