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
  likePostById,
} = require("../controllers/user");

userRouter.get("/me", passport.authenticate("jwt", { session: false }), me);

userRouter.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  getOwnPosts
);

userRouter.post(
  "/post/create",
  passport.authenticate("jwt", { session: false }),
  createPost
);

userRouter.post(
  "/publish/:postId",
  passport.authenticate("jwt", { session: false }),
  publishPost
);

userRouter.delete(
  "/post/del/:postId",
  passport.authenticate("jwt", { session: false }),
  deletePostById
);

// private route // todo move to userRouter
userRouter.post(
  "/like/:postId",
  passport.authenticate("jwt", { session: false }),
  likePostById
);

module.exports = userRouter;

module.exports = userRouter;
