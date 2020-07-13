import express from "express";

import PostsController from "../controllers/posts.controller";

const postsRouter = express.Router();

const postsController = new PostsController();

postsRouter.post("/", postsController.create);
postsRouter.get("/", postsController.list);
postsRouter.get("/:id", postsController.listByUser);

export default postsRouter;
