const authController = require("../controllers/authControllers");
const middlewareController = require("../controllers/middlewareController");

const authRouter = require("express").Router();

// Register
authRouter.post("/register", authController.registerUser);

// Log in
authRouter.post("/login", authController.loginUser);

// Refresh
authRouter.post("/refresh", authController.refreshToken);

// Log out
authRouter.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);

module.exports = authRouter;
