import { Router } from "express";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import auth from "../config/auth";

const prisma = new PrismaClient();

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
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

  console.log(user)
  console.log(token)

  return res.json({ user, token });
});

export default sessionsRouter;
