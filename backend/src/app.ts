import express from "express";
import * as dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import cors from "cors";
import * as routes from "./routes/index";
import { status } from "./responseStatus/responseStatus";

const app = express();
app.use(express.json()); //parse incoming JSON
app.use(cors()); //avoid CORS error

dotenv.config();

//create account
app.post("/api/v1/users/signup", routes.signup);

//login into account
app.post("/api/v1/users/signin", routes.signin);

/* ---- CRUD operations ---- */
app.use("/api/v1/blog*", async (req, res, next) => {
  const token: string = req.headers.authorization || ""; //get JWT token

  //AUTHORIZATION token not provided
  if (!token) {
    return res.status(status.Unauthorized).json({ msg: "Token not provided" });
  }

  try {
    const secret = process.env.JWT_Secret; //JWT admin password

    //JWT admin password not found
    if (!secret) {
      console.error("JWT_Secret is not defined in the environment variables");
      return res
        .status(status.InternalServerError)
        .json({ msg: "Internal Server Error" });
    }

    //getting user details from JWT token
    const user = jwt.verify(token, secret) as JwtPayload;
    console.log(user);

    if (user && user.id) {
      req.body = {
        id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        userId: user.id,
      };
      next();
    } else {
      return res.status(status.Unauthorized).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(status.Forbidden)
      .json({ msg: "Invalid or expired token" });
  }
});

//Create a blog post
app.post("/api/v1/blog", routes.createBlog); //C -> create blogs

//update blog post
app.put("/api/v1/blog", routes.updateBlog); //U -> update blog

//delete a blog post
app.delete("/api/v1/blog", routes.deleteBlog); //D -> delete blog

//read all blog post
app.get("/api/v1/blog/all", routes.readAllBlog); //R -> read all blog

//read a single blog post
app.get("/api/v1/blog/:id", routes.readBlog); //R -> read blog
/* ---- ---- */

export default app;
