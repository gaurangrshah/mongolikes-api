const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/User");

require("dotenv").config();

// used by passport to extract cookie from request
const cookieExtractor = (req) => {
  let token = null;
  if (req?.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// used for authorization on all protected endpoints
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      const user = await User.findById({ _id: payload.sub._id })
        .populate("posts")
        .exec();
      if (!user || user?.error) return done(user?.error, false);
      if (user) return done(null, user);

      return done(null, false);
    }
  )
);

// authentication via (LocalStrategy) username + pw
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      // if user exists check password against hashedPw
      user.comparePassword(password, done);
    });
  })
);
