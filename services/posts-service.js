const Post = require("../models/Post");
const User = require("../models/User");
const { errors, sortBy } = require("../utils");
const UserFactory = require("../utils/userFactory");

module.exports = {
  getFeed: async () => {
    try {
      const posts = await Post.find()
        .sort({ published: "desc" })
        .populate("author")
        .exec();

      console.log("🚀 | file: posts-service.js | line 10 | posts", posts?.length);

      return {
        status: 200,
        posts: posts?.length && posts.filter((post) => post.published),
        message: `record found ${posts?._id}`,
        error: false,
      };
    } catch (err) {
      return { ...errors.server, err };
    }
  },
  getPostsByAuthor: async (username) => {
    try {
      const author = new UserFactory(
        await User.findOne({ username }).populate("posts").exec()
      );
      // return only published posts
      const publicPosts = author?.posts?.filter((post) => post.published);

      author.posts.length = 0;

      return {
        author: new UserFactory(author),
        posts: sortBy(publicPosts, ["published"]),
        message: publicPosts?.length // handle edge case: `author has no posts`
          ? `success found ${publicPosts?.length} records`
          : `sorry, cound not find any ${
              author?.posts?.length && "public"
            } records`,
        status: 200,
        error: false,
      };
    } catch (err) {
      return { ...errors.server, err };
    }
  },
  getPostBySlug: async (slug) => {
    try {
      const post = await Post.find({ slug: slug }).populate("author").exec();

      return {
        status: 200,
        post,
        message: "success found record",
        error: false,
      };
    } catch (err) {
      return { ...errors.server, err };
    }
  },
  getPostById: async (postId) => {
    try {
      const post = await Post.find({ _id: postId }).populate("author").exec();
      if (post?.length) {
        return {
          status: 200,
          post,
          message: "success found record",
          error: false,
        };
      } else {
        return { ...errors.notfound };
      }
    } catch (err) {
      return { ...errors.server, err };
    }
  },
};
