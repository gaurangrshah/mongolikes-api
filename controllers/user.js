const userService = require("../services/user-service");
const { errors } = require("../utils");

async function me(req, res) {
  // possibly a redundant check, since passport middleware is already validating the user
  if (!req.isAuthenticated()) res.status(401).json(errors.unauthorized);
  const user = await userService.profile(req.user?._id);
  if (user?.error) res.status(user?.status).json(user);
  res.status(200).json({
    user,
    message: "Success user data retrieved",
    error: false,
  });
}

async function createPost(req, res) {
  const response = await userService.createPost(req.body, req.user);
  res.status(response.status).json(response);
}

async function getOwnPosts(req, res) {
  const response = await userService.ownPosts(req.user._id);
  res.status(response.status).json(response);
}

async function publishPost(req, res) {
  const response = await userService.publishPost(
    req.params?.postId,
    req?.user?.id
  );
  console.log("🚀 | file: user.js | line 32 | response", response);
  res.status(response?.status).json(response);
}

async function deletePostById(req, res) {
  const response = await userService.deletePost(req.params?.postId, req.user);
  if (response) {
    res.status(response?.status).json(response);
  } else {
    res.status(500);
  }
}

module.exports = {
  me,
  createPost,
  getOwnPosts,
  deletePostById,
  publishPost,
};
