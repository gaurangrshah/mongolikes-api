const authService = require("../services/auth-service");
const userService = require("../services/user-service");
const { errors, User } = require("../utils");

async function register(req, res) {
  const response = await authService.register(req.body);
  console.log("🚀 | file: auth.js | line 7 | response", response);
  res.status(200).json(response);
}

async function login(req, res) {
  // check if user has been authenticated via passport
  if (req.isAuthenticated()) {
    const token = await authService.login(req.user);

    // set cookie and headers for cookie permissions.
    res.cookie("access_token", token, {
      httpOnly: true, // prevents js-based cookie manipulation
      sameSite: true, // prevents csrf attacks
    });

    const response = await userService.profile(req?.user?._id);

    res.status(200).json({
      user: new User(response?.user),
      message: `Welcome, ${response?.user?.username}`,
      error: false,
    });
  } else {
    res.status(401);
  }
}

function logout(req, res) {
  // remove jwt from cookies to deauthenticate user
  res.clearCookie("access_token");
  res.status(200).json({
    user: new User(),
    message: "cookie cleared",
    error: false,
  });
}

function authenticate(req, res) {
  //   verify auth status
  const isAuthenticated = req.isAuthenticated();
  // @NOTE: if user is not authenticated, middleware will should've a 401 error for us

  res.status(200).json({
    user: new User(req.user),
    message: `user isAuthenticated: ${isAuthenticated}`,
    error: false,
  });
}

// @NOTE: not implemented currently || no service defined
function adminAccess(req, res) {
  // @NOTE: passport middleware verifies auth, only need to verify user's role:
  if (req.user.role === "admin") {
    res.status(200).json({ message: "Welcome Admin!", error: false });
  } else {
    res.status(errors.unauthorized.status).json(errors.unauthorized.message);
  }
}

module.exports = {
  register,
  login,
  logout,
  authenticate,
  adminAccess,
};
