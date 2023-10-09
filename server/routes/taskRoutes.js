const Router = require("express");
const taskController = require("../controllers/taskController");

const router = new Router();

router.post("/create", taskController.createTask);
router.get("/getAll/:id", taskController.getAllTasks);
router.put("/update/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;
