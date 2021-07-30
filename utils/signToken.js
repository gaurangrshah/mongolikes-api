const JWT = require("jsonwebtoken");

require("dotenv").config();

// adds application signuate to token
function signToken(userId) {
  return JWT.sign(
    {
      // populate jwt payload
      iss: "mongo-likes", // set issuer
      sub: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // set token expiry
  );
}

module.exports = signToken;
