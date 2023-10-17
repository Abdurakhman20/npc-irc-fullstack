const { Task } = require("../models/index");
const sequelize = require("../database/db.js");

class TaskController {
  async createTask(req, res) {
    const { title, description, status, end_date, user_id } = req.body;
    try {
      const [task] = await sequelize.query(
        `
        INSERT INTO tasks (title, description, status, end_date, user_id)
        VALUES (?, ?, ?, ?, ?)
        RETURNING *
        `,
        {
          replacements: [title, description, status, end_date, user_id],
          type: sequelize.QueryTypes.INSERT,
          model: Task,
        }
      );
      // const task = await Task.create({
      //   title,
      //   description,
      //   status,
      //   end_date,
      //   user_id,
      // });
      return res.status(200).json({ message: "Success! Task created!", task });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error! An error occurred while creating the task!" });
    }
  }

  async getUserTasks(req, res) {
    const { limit, offset } = req.query;
    try {
      const tasks = await sequelize.query(
        `
        SELECT * FROM tasks
        LIMIT :limit
        OFFSET :offset
        `,
        {
          replacements: {
            limit: limit || 10,
            offset: offset || 0,
          },
          type: sequelize.QueryTypes.SELECT,
          model: Task,
        }
      );

      const totalRows = await Task.findAndCountAll();
      // const tasks = await Task.findAll({
      //   limit: limit || 10,
      //   offset: offset || 0
      // });
      return res
        .status(200)
        .json({ message: "Success! get all tasks!", tasks, totalRows });
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
      // const task = await Task.findByPk(id);
      const [task] = await sequelize.query(
        `
        UPDATE tasks
        SET title = :title,
            description = :description,
            status = :status,
            end_date = :end_date
        WHERE id = :id
        RETURNING *
        `,
        {
          replacements: { id, title, description, status, end_date },
          type: sequelize.QueryTypes.UPDATE,
          model: Task,
        }
      );
      if (!task) {
        return res.status(400).json({ message: "Error! Task not found!" });
      }
      // task.title = title;
      // task.description = description;
      // task.status = status;
      // task.end_date = end_date;

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
      // const task = await Task.findByPk(id);
      const [task] = await sequelize.query(
        `
        DELETE FROM tasks
        WHERE id = :id
        RETURNING *
        `,
        {
          replacements: { id },
          type: sequelize.QueryTypes.DELETE,
          model: Task,
        }
      );
      if (!task) {
        return res.status(400).json({ message: "Error! Task not found!" });
      }
      // task.destroy();
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
