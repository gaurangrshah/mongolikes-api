const express = require("express");
const defaultRouter = express.Router();
const fetch = require("isomorphic-fetch");

async function getDefault(req, res) {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => res.status(200).send({ body: json }))
    .catch((err) => res.status(500).send({ body: err }));
}

async function createPost(req, res) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => res.status(200).send({ body: json }))
    .catch((err) => res.status(500).send({ body: err }));
}

defaultRouter.get("/", getDefault);

module.exports = defaultRouter;
