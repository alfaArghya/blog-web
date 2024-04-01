import express from "express";
import * as dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as routes from "./routes/index";
import { status } from "./responseStatus/responseStatus";

const app = express();
app.use(express.json());
dotenv.config();

//create account
app.post("/api/v1/users/signup", routes.signup);

//login into account
app.post("/api/v1/users/signin", routes.signin);

//CRUD operations
app.use("/api/v1/blog*", async (req, res, next) => {
  const token: string = req.headers.authorization || "";

  if (!token) {
    return res.status(401).send("Token not provided"); // 401 Unauthorized
  }

  try {
    const secret = process.env.JWT_Secret;
    if (!secret) {
      console.error("JWT_Secret is not defined in the environment variables");
      return res
        .status(status.InternalServerError)
        .send("Internal Server Error"); // 500 Internal Server Error
    }

    const user = jwt.verify(token, secret) as JwtPayload;
    console.log(user);

    // Assuming `id` exists on your JwtPayload. Adjust as needed.
    if (user && user.id) {
      // Add userId to req object. Consider using a custom property to avoid overwriting.
      req.body = {
        id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        userId: user.id,
      };
      next();
    } else {
      return res.status(status.Unauthorized).json({ msg: "Unauthorized" }); // Unauthorized
    }
  } catch (error) {
    console.error(error);
    return res
      .status(status.Forbidden)
      .json({ msg: "Invalid or expired token" }); // 403 Forbidden
  }
});
app.post("/api/v1/blog", routes.createBlog); //C -> create blogs
app.put("/api/v1/blog", routes.updateBlog); //U -> update blog
app.delete("/api/v1/blog", routes.deleteBlog); //D -> delete blog
app.get("/api/v1/blog/all", routes.readAllBlog); //R -> read all blog
app.get("/api/v1/blog/:id", routes.readBlog); //R -> read blog

export default app;
