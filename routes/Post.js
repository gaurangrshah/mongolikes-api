const express = require("express");
const postRouter = express.Router();

const passport = require("passport");
const passportConfig = require("../services/passport");

const {
  getFeed,
  getPostsByAuthor,
  getPostBySlug,
  getPostById,
} = require("../controllers/post");

// public routes
postRouter.get("/feed", getFeed);
postRouter.get("/author/:username", getPostsByAuthor);
postRouter.get("/slug/:slug", getPostBySlug);

// not implemented on frontend infavor of getbyslug
postRouter.get("/id/:postId", getPostById);

module.exports = postRouter;
