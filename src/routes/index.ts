import express from "express";

import userRouter from "./users.routes";
import postsRouter from "./posts.routes";
import sessionsRouter from "./sessions.routes";

import { ensureAuthenticated } from "../middlewares";

const router = express.Router();

router.use("/session", sessionsRouter);
router.use("/users", userRouter);
router.use("/posts", ensureAuthenticated, postsRouter);

export default router;
