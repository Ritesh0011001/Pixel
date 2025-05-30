import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@amulgaurav/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.get("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1];

    const { id } = await verify(token, c.env.JWT_SECRET);

    if (!id) {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
      select: {
        name: true,
      },
    });

    return c.json({ name: user?.name });
  } catch {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { data, success } = signupInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct",
      });
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    // token expiry: 5 days
    const token = await sign(
      { id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5 },
      c.env.JWT_SECRET
    );

    return c.json({ name: user.name, token });
  } catch (e) {
    c.status(403);
    return c.json({ message: "User already exists!" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { data, success } = signinInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "User not found!" });
    }

    // token expiry: 5 days
    const token = await sign(
      { id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5 },
      c.env.JWT_SECRET
    );

    return c.json({ name: user.name, token });
  } catch (error) {
    return c.json({ message: "Error occured while signing up!" });
  }
});
