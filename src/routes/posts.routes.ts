import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const postsRouter = express.Router();

postsRouter.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return res.json(posts);
});

postsRouter.post("/", async (req, res) => {
  const { title, content, authorId } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: authorId },
    data: {
      posts: {
        create: {
          title,
          content,
        },
      },
    },
    include: {
      posts: true,
    },
  });

  return res.json(updatedUser.posts);
});

export default postsRouter;