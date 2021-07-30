const mongoose = require("../services/mongoose");
const seedFaker = require("../services/faker.js");
const { errors } = require("../utils");
function seeder(req, res) {
  const isAdmin = req?.user ? req.user?.role === "admin" : false;
  if (!isAdmin) {
    return res.status(errors.unauthorized.status).json(errors.unauthorized);
  }

  mongoose.connection.dropCollection("users", function (err, result) {
    if (err) {
      return console.log(errors.notmodified.message, err.stack);
    }
    console.log("dropped user collection successully!", result);
  });
  mongoose.connection.dropCollection("posts", function (err, result) {
    if (err) {
      return console.log(errors.notmodified.message, err.stack);
    }
    console.log("dropped posts collection successully!", result);
  });
  seedFaker();
  res.status(200).json({
    message: { message: "Seeded db successfully", error: false },
  });
}

module.exports = { seeder };
