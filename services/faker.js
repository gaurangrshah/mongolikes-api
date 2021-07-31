const faker = require("faker");
const User = require("../models/User");
const Post = require("../models/Post");
const {
  randomDate,
  randomNumberBetween,
  randomString,
  slugify,
} = require("../utils");

const users = [];

// generate random users using faker
function generateUsers() {
  for (var i = 0; i < 10; i++) {
    const user = new User({
      username: `${faker.name.firstName()}-${randomString()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: "user",
      avatar: faker.image.avatar(),
      posts: [],
      likes: [],
    });

    users.push(user);
  }
}

// generate content for users using faker w/ probabilities
function generatePostsForUsers() {
  users.forEach((user) => {
    // random # of posts to generate for each user
    const postCount = randomNumberBetween(0, 6);

    for (let i = 0; i < postCount; i++) {
      const title = faker.lorem.sentence(5, 9);

      const post = new Post({
        title: title,
        body: faker.lorem.paragraphs(),
        author: user._id,
        slug: slugify(title),
        image: faker.image.people(),
        likes: [],
      });

      if (Math.random() < 0.4) {
        // 40% chance post is published
        post.published = randomDate(new Date(2019, 0, 1), new Date());
      }

      if (post?.published) {
        users.forEach((u) => {
          if (Math.random() < 0.2) {
            u.likes.push(post._id);
            post.likes.push(u._id);
          }
        });
      }

      // add post to user
      user.posts.push(post._id);

      post.save((err, data) => {
        if (err) {
          console.log("error faking posts", err);
          return;
        }
        console.log("created Post", data._id);
      });
    }
    user.save((err, data) => {
      if (err) {
        console.log("error occured", err);
      }
      console.log("created User", user._id);
    });
  });
}

function seedFaker() {
  generateUsers();
  generatePostsForUsers();
}

module.exports = seedFaker;
