const Router = require("express");
const router = new Router();

const userRouter = require("./userRoutes");
const taskRouter = require("./taskRoutes");

router.use("/user", userRouter);
router.use("/task", taskRouter);

module.exports = router;
