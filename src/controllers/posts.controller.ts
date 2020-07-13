import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostsController {
  async create(req: Request, res: Response) {
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
  }

  async list(req: Request, res: Response) {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });

    return res.json(posts);
  }

  async listByUser(req: Request, res: Response) {
    const { id } = req.params;

    const posts = await prisma.post.findMany({
      where: {
        authorId: parseInt(id),
      },
      include: {
        author: true,
      },
    });

    return res.json(posts);
  }
}

export default PostsController;
