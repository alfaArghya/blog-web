import express from "express";
import * as routes from "./routes/index";

const app = express();

//create account
app.post("/api/v1/users/signup", routes.signup);

//login into account
app.post("/api/v1/users/signin", routes.signin);

//CRUD operations
app.post("/api/v1/blog", routes.createBlog); //C -> create blogs
app.put("/api/v1/blog", routes.updateBlog); //U -> update blog
app.delete("/api/v1/blog", routes.deleteBlog); //D -> delete blog
app.get("/api/v1/blog/all", routes.readAllBlog); //R -> read all blog
app.get("/api/v1/blog/:id", routes.readBlog); //R -> read blog

export default app;
