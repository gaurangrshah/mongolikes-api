const User = require("../models/User");
const { errors, signToken } = require("../utils");

module.exports = {
  register: async ({ username, email, password, role }) => {
    try {
      // check if user already exists
      const user = await User.findOne({ username });
      if (user) {
        return errors.duplicate;
      }

      if (!user) {
        // create new user
        let newUser = new User({ username, email, password, role });
        newUser = await newUser.save();
        try {
          return newUser;
        } catch (err) {
          return { ...errors.save, error: err };
        }
      }
    } catch (err) {
      return { ...errors.server, err };
    }
  },
  login: async ({ _id, username }) => {
    try {
      return signToken({ _id, username });
    } catch (err) {
      return { ...errors.server, err };
    }
  },
};
