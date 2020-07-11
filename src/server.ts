import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  return res.json(users);
});

app.get("/users/:id", async (req, res) => {
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

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return res.json(user);
});

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany();

  return res.json(posts);
});

app.post("/posts", async (req, res) => {
  const { title, content, authorId } = req.body;

  const user = prisma.user.findOne({
    where: {
      id: authorId,
    },
  });

  if (!user) {
    return res.status(400).json({ error: "Need to specify the author" });
  }

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

app.listen(3333, () => console.log("Running on port 3333 🔥"));
