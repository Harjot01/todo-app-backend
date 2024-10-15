import express from "express";
import {
  createTask,
  deleteTask,
  markAsCompleted,
  showAllTasks,
} from "../controllers/tasks.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTask);
router.get("/all", isAuthenticated, showAllTasks);
router.route("/:id").put(isAuthenticated, markAsCompleted).delete(isAuthenticated, deleteTask);

export default router;

/*
1) Create Task
2) Update Task
3) Delete Task
4) View all tasks

*/
