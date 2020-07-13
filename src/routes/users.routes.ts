import express from 'express';

import { PrismaClient } from '@prisma/client'

import { ensureAuthenticated } from '../middlewares'
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();
const userRouter = express.Router();

userRouter.get("/", ensureAuthenticated ,async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  return res.json(users);
});

userRouter.get("/:id", ensureAuthenticated, async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findOne({
    where: {
      id: parseInt(id),
    },
    include: {
      posts: true,
    },
  });

  return res.json(user);
});

userRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hash(password, 8);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return res.json(user);
});

export default userRouter;