import express from 'express';

import { ensureAuthenticated } from '../middlewares'
import UsersController from '../controllers/users.controller'

const userRouter = express.Router();

const usersController = new UsersController();

userRouter.post("/", usersController.create);
userRouter.get("/", ensureAuthenticated , usersController.list);
userRouter.get("/:id", ensureAuthenticated, usersController.getUser);

export default userRouter;