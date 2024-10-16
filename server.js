import express from "express";
import userRouter from "./routes/user.js";
import tasksRouter from "./routes/tasks.js";
import { config } from "dotenv";
import { connectDB } from "./data/database.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/err.js";
import cors from "cors";
const app = express();

config({
  path: "./data/config.env",
});

connectDB();

// adding middlewares
app.use(express.json());
app.use(cookieParser());
// CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// adding routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks/", tasksRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Using Error Middlware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Server is Working");
});
