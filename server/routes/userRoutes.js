const Router = require("express");
const userController = require("../controllers/userController");

const router = new Router();

router.post("/add", userController.addUser);
router.get("/getAll", userController.getAll);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
