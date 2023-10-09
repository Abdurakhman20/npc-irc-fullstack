const { Task } = require("../models/index");

class TaskController {
  async createTask(req, res) {
    const { title, description, status, end_date, user_id } = req.body;
    try {
      const task = await Task.create({
        title,
        description,
        status,
        end_date,
        user_id,
      });
      return res.status(200).json({ message: "Success! Task created!", task });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error! An error occurred while creating the task!" });
    }
  }

  async getAllTasks(req, res) {
    const { id } = req.params; // user_id
    try {
      const tasks = await Task.findAll({
        where: {
          user_id: id,
        },
      });
      return res
        .status(200)
        .json({ message: "Success! get all tasks!", tasks });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error! An error occurred while getting tasks!" });
    }
  }

  async updateTask(req, res) {
    const { id } = req.params; //task id
    const { title, description, status, end_date } = req.body;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(400).json({ message: "Error! Task not found!" });
      }
      task.title = title;
      task.description = description;
      task.status = status;
      task.end_date = end_date;

      return res.status(200).json({ message: "Success! Task updated!", task });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error! An error occurred while updating task!" });
    }
  }

  async deleteTask(req, res) {
    const { id } = req.params; //task id
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(400).json({ message: "Error! Task not found!" });
      }
      task.destroy();
      return res.status(200).json({ message: "Success! Task deleted!", task });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error! An error occurred while deleting task!" });
    }
  }
}

module.exports = new TaskController();
