const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      minlength: 3,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    avatar: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  // mongoose pre hook (middleware) --  encrypts user password
  if (!this.isModified("password")) {
    // skip encryption when nothing is modified.
    return next();
  }
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
      return next(err);
    }
    this.password = passwordHash;
    next();
  });
});

// used to compare plain text vs hashed pws
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    } else {
      if (!isMatch) {
        return cb(null, isMatch);
      }
      // the callback sets the user onto the req.object
      return cb(null, this); // this = {user}
    }
  });
};

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.role;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

module.exports = mongoose.model("User", UserSchema);
