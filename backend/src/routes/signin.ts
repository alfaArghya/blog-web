import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as argon2 from "argon2";
import { status } from "../responseStatus/responseStatus";
import { signinInput } from "../types";

const prisma = new PrismaClient(); //prisma client
dotenv.config();

const signin = async (req: Request, res: Response) => {
  //getting data from user
  const username: string = req.body.username;
  const password: string = req.body.password;

  //checking all data for correct format
  const { success } = signinInput.safeParse({
    username,
    password,
  });

  //all data is not in correct format -> so can't login
  if (!success) {
    res.status(status.InvalidInput).json({ msg: "Invalid inputs" });
    return;
  }

  try {
    //finding user in database
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    //user not found -> so can't login
    if (!user) {
      res.status(status.Forbidden).json({
        message: "Invalid username",
      });
      return;
    }

    //checking password
    if (!(await argon2.verify(user.password, password))) {
      res.status(status.Forbidden).json({
        msg: "Incorrect password",
      });
      return;
    }

    //create JWT token for user AUTHENTICATION
    const token = jwt.sign(
      { id: user.id, username: user.username },
      `${process.env.JWT_Secret}`
    );

    //return JWT token
    res.json({
      message: "Hello user!",
      token,
    });
  } catch (err) {}
};

export default signin;
