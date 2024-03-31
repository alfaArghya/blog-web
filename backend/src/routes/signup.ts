import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as argon2 from "argon2";
import { status } from "../responseStatus/responseStatus";

const prisma = new PrismaClient();
dotenv.config();

const signup = async (req: Request, res: Response) => {
  const name: string = req.body.name;
  const email: string = req.body.email;
  const username: string = req.body.username;
  const password: string = req.body.password;

  const hashPassword = await argon2.hash(password);

  try {
    const createUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        username: username,
        password: hashPassword,
      },
    });

    const token = jwt.sign(
      { id: createUser.id, username: createUser.username },
      `${process.env.JWT_Secret}`
    );

    res.status(status.Success).json({
      message: "signup successful",
      token,
    });
  } catch (err) {
    res
      .status(status.Conflict)
      .json({ msg: "username or email already exist" });
    return;
  }
};

export default signup;
