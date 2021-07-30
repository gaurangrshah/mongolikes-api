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
  updateLikes: async (postId, user, updatePostLikes, updateUserLikes) => {
    try {
      const post = await Post.findById(postId);
      if (post) {
        if (!post.published) {
          return { ...errors.badrequest };
        }
        const updatedPost = updatePostLikes(post, user._id);
        if (updatedPost) {
          await updatedPost.save();
        } else {
          return {
            ...errors.save,
            message: "!Error could not update posts",
          };
        }
        const updatedUser = updateUserLikes(postId, user);
        if (updatedUser) {
          await updatedUser.save();
        } else {
          return {
            ...errors.save,
            message: "!Error could not update user",
          };
        }
        return {
          status: 200,
          updatedPost,
          message: "success Likes updated",
          error: false,
        };
      } else {
        return {
          ...errors.notfound,
          message: "!Error that record does not exist",
        };
      }
    } catch (err) {
      return { ...errors.server, err };
    }
  },
  // helper fns ======================================
  updateLikeByUser: (postId, user) => {
    if (user.likes.includes(postId)) {
      // if user already likes post then remove like
      const indexToRemove = user.likes.findIndex((like) => like === postId);
      user.likes.splice(indexToRemove, 1);
    } else {
      // if user has not liked post then add like
      user.likes.push(postId);
    }
    return user;
  },
  updateLikeOnPost: (post, userId) => {
    if (Object.keys(post)?.length) {
      if (post.likes.includes(userId)) {
        // if user already likes this post then remove like
        const indexToRemove = post.likes.findIndex((like) => like === userId);
        post.likes.splice(indexToRemove, 1);
      } else {
        // if user hasn't liked this post then add like
        post.likes.push(userId);
      }
      return post;
    }
  },
};
