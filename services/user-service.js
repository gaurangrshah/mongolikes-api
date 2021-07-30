const User = require("../models/User");
const Post = require("../models/Post");
const { errors, slugify } = require("../utils");

module.exports = {
  createPost: async (post, user) => {
    const { title } = post;
    try {
      // create a new post from request
      const newPost = new Post({
        ...post,
        slug: slugify(title),
        author: user._id,
      });
      const savedPost = await newPost.save();
      if (savedPost) {
        // update user with saved post
        user.posts.push(savedPost);
        return {
          status: 201,
          message: "post created",
          post,
          user: await user.save(),
          error: false,
        };
      } else throw new Error(errors.save.message);
    } catch (err) {
      return { ...errors.server, err };
    }
  },
  ownPosts: async (userId) => {
    // @NOTE: not implemented in front end in favor of `/me`
    try {
      const user = await User.findById({ _id: userId })
        .populate("posts")
        .exec();
      return {
        status: 200,
        message: user.posts?.length
          ? "success record found"
          : "user does not have any records",
        posts: user.posts,
        error: false,
      };
    } catch (err) {
      return { ...errors.server, err };
    }
  },
  profile: async (userId) => {
    const user = await User.findOne({ _id: userId }).populate("posts").exec();
    if (!user) return { ...errors.notfound };
    return {
      status: 200,
      message: "success record found",
      user,
      error: false,
    };
  },
  publishPost: async (postId, userId) => {
    try {
      const [post] = await Post.find({ _id: postId }).populate("author").exec();
      if (!post) return { ...errors.notfound };

      // check if owner === author
      if (String(post?.author?._id) === userId) {
        post.published = Date.now();
        const savedPost = await post.save();
        if (savedPost) {
          return {
            status: 200,
            post: savedPost,
            message: "success found record",
            error: false,
          };
        }
      } else {
        return { ...errors.badrequest };
      }
    } catch (err) {
      return { ...errors.server, err };
    }
  },
  deletePost: async (postId, user) => {
    try {
      // check if post exists
      const postExists = await Post.findOne({ _id: postId });
      if (postExists) {
        // check if user is owner of the post
        if (postExists.author.toString() === user._id.toString()) {
          // delete post
          const result = await Post.deleteOne({ _id: postId.toString() });
          if (result) {
            // findIndex of post to be deleted
            const postIndex = user.posts.findIndex(
              (post) => post._id === postExists._id
            );
            // remove post reference from user instance
            user.posts.splice(postIndex, 1);
            await user.save();
            return { status: 200, result, error: false };
          } else {
            return {
              ...errors.save,
              message: "error updating user posts",
            };
          }
        } else {
          return {
            ...errors.unauthorized,
            message: "You cannot perform this action on this item",
          };
        }
      } else {
        return errors.notFound;
      }
    } catch (err) {
      return { ...errors.server, err };
    }
  },
};
