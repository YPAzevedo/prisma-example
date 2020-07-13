import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

class UsersController {
  async create(req: Request, res: Response) {
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
  }

  async list(req: Request, res: Response) {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });

    return res.json(users);
  }

  async getUser(req: Request, res: Response) {
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
  }
}

export default UsersController;
