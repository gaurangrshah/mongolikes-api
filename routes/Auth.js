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

authRouter.post("/register/", register);

authRouter.post(
  "/login/",
  passport.authenticate("local", { session: false }), // passport auth middleware
  login
);

// authRouter.get(
//   "/user/",
//   // passport.authenticate("local", { session: false }),
//   (req, res) => {
//     // const { _id, username } = req.body;
//     // console.log("🚀 | file: Auth.js | line 28 | _id, username", _id, username);

//     res.send({ message: `logged in test`, status: 200 });
//   }
// );

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
