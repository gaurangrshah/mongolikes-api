const express = require("express");
const mongoose = require("../services/mongoose");

const { seeder } = require("../controllers/seed");

const seedRouter = express.Router();

seedRouter.post("/all", seeder);

module.exports = seedRouter;
