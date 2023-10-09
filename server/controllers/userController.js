const { User } = require("../models/index.js");

class UserController {
  async addUser(req, res) {
    const { name, age, email, role } = req.body;
    try {
      const candidate = await User.findOne({
        where: {
          email,
        },
      });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Error! This user already exists!" });
      }
      const user = await User.create({
        name,
        age,
        email,
        role,
      });

      return res.status(200).json({ message: "Success! User created!", user });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error! An error occurred while creating the user!" });
    }
  }
  async getAll(req, res) {
    const { limit, offset } = req.query;
    try {
      const users = await User.findAll({
        limit: limit || 10,
        offset: offset || 0,
      });
      return res.json({ message: "Success!", users });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error! An error occurred while getting users!" });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, age, email, role } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({ message: "Error! User not found!" });
      }

      user.name = name;
      user.age = age;
      user.email = email;
      user.role = role;

      return res.status(200).json({ message: "Success! User updated!", user });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error! An error occurred while updating the user!" });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(400).json({ message: "Error! User not found!" });
      }
      await user.destroy();
      return res.status(200).json({ message: "Success! User deleted!", user });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error! An error occurred while deleting the user!" });
    }
  }
}

module.exports = new UserController();
