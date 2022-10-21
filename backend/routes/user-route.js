const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userControllers");

const userRouter = require("express").Router();

// Get all user
userRouter.get(
  "/",
  middlewareController.verifyToken,
  userController.getAllUser
);

// Delete user
userRouter.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = userRouter;
