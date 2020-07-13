import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import auth from "../config/auth";

const prisma = new PrismaClient();

class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("Incorrect email or password");
    }

    // user.password --> hashed password.
    // password --> unhashed password.

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Incorrect email or password");
    }

    const { secret, expiration } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id.toString(),
      expiresIn: expiration,
    });

    delete user.password;

    return res.json({ user, token });
  }
}

export default SessionsController;
