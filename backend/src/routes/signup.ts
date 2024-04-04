import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as argon2 from "argon2";
import { status } from "../responseStatus/responseStatus";
import { signupInput } from "../types";

const prisma = new PrismaClient(); //prisma client
dotenv.config();

const signup = async (req: Request, res: Response) => {
  //getting data from user
  const name: string = req.body.name;
  const email: string = req.body.email;
  const username: string = req.body.username;
  const password: string = req.body.password;

  //checking all data for correct format
  const { success } = signupInput.safeParse({
    name,
    email,
    username,
    password,
  });

  //all data is not in correct format -> so can't create account
  if (!success) {
    res.status(status.InvalidInput).json({ msg: "Invalid inputs" });
    return;
  }

  try {
    // username or mail already exist --> so can't create account
    if (
      await prisma.user.findFirst({
        where: { username: username, email: email },
      })
    ) {
      res.status(status.InvalidInput).json({
        msg: "Username or email already exists",
      });
      return;
    }

    const hashPassword = await argon2.hash(password); //hash the password

    // create a new user
    const createUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        username: username,
        password: hashPassword,
      },
    });

    //create JWT token for user AUTHENTICATION
    const token = jwt.sign(
      { id: createUser.id, username: createUser.username },
      `${process.env.JWT_Secret}`
    );

    //return JWT token
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
