const express = require("express");
const postRouter = express.Router();

const passport = require("passport");
const passportConfig = require("../services/passport");

const {
  getFeed,
  getPostsByAuthor,
  getPostBySlug,
  getPostById,
  likePostById,
} = require("../controllers/post");

// public routes
postRouter.get("/feed", getFeed);
postRouter.get("/author/:username", getPostsByAuthor);
postRouter.get("/post/:slug", getPostBySlug);

// not implemented on frontend infavor of getbyslug
postRouter.get("/id/:postId", getPostById);

// private route
postRouter.post(
  "/like/:postId",
  passport.authenticate("jwt", { session: false }),
  likePostById
);

module.exports = postRouter;
