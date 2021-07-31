const express = require("express");
const passport = require("passport");
const passportConfig = require("../services/passport");
const { seeder } = require("../controllers/seed");

const seedRouter = express.Router();

seedRouter.post(
  "/all",
  passport.authenticate("jwt", { session: false }),
  seeder
);

module.exports = seedRouter;
