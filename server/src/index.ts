import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";

const app = new Hono();

app.use(
  "/api/v1/*",
  cors({
    origin: ["http://localhost:5173", "https://pixel-self-nine.vercel.app"],
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/user", userRouter);

export default app;
