const sortBy = require("./sortBy");

function User(data) {
  if (data) {
    const { _id, role, username, email, avatar, posts } = data;
    return {
      _id,
      role,
      username,
      email,
      avatar,
      posts,
    };
  } else {
    return {
      _id: "",
      role: "",
      username: "",
      email: "",
      avatar: "",
      posts: [],
    };
  }
}

module.exports = User;
