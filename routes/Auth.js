const express = require("express");
const authRouter = express.Router();

const passport = require("passport");
const passportConfig = require("../services/passport");

const {
  register,
  login,
  logout,
  adminAccess,
  authenticate,
} = require("../controllers/auth");

authRouter.post("/register", register);

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }), // passport auth middleware
  login
);

authRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);

authRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  adminAccess
);

authRouter.get(
  "/authenticate",
  passport.authenticate("jwt", { session: false }),
  authenticate
);

module.exports = authRouter;
