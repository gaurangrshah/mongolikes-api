const postsService = require("../services/posts-service");

async function getPostsByAuthor(req, res) {
  const response = await postsService.getPostsByAuthor(
    req.params.username,
    req.user
  );

  if (response) res.status(response?.status).json(response);
  else res.status(400).json({ message: "unknown error", error: true });
}

async function getFeed(req, res) {
  const response = await postsService.getFeed();
  res.status(200).json(response);
}

async function getPostBySlug(req, res) {
  const response = await postsService.getPostBySlug(req.params?.slug);
  res.status(response?.status).json(response);
}

async function getPostById(req, res) {
  const response = await postsService.getPostById(req.params?.postId);
  res.status(response?.status).json(response);
}

async function likePostById(req, res) {
  // add or remove like based on if the user likes post already´
  const response = await postsService.updateLikes(
    req.params?.postId,
    req.user,
    postsService.updateLikeOnPost,
    postsService.updateLikeByUser
  );

  res.status(response?.status || 400).json(response);
}

module.exports = {
  getFeed,
  getPostsByAuthor,
  getPostBySlug,
  getPostById,
  likePostById,
};
