const express = require("express");
const userRouter = express.Router();

const passport = require("passport");
const passportConfig = require("../services/passport");

const {
  me,
  createPost,
  deletePostById,
  getOwnPosts,
  publishPost,
} = require("../controllers/user");

userRouter.get("/me", passport.authenticate("jwt", { session: false }), me);

userRouter.post(
  "/post/create",
  passport.authenticate("jwt", { session: false }),
  createPost
);

userRouter.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  getOwnPosts
);

userRouter.delete(
  "/post/del/:postId",
  passport.authenticate("jwt", { session: false }),
  deletePostById
);

userRouter.post(
  "/publish/:postId",
  passport.authenticate("jwt", { session: false }),
  publishPost
);

module.exports = userRouter;
