import { ErrorHandler } from "../middlewares/err.js";
import { Tasks } from "../models/tasks.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Tasks.create({ title, description, user: req.user });
    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(error);   
  }
};

export const showAllTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const markAsCompleted = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    if (!task) return next(new ErrorHandler("Invalid ID", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Completed Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Tasks.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Invalid ID", 404));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
