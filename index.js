const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./services/mongoose");
const authRouter = require("./routes/Auth");
const userRouter = require("./routes/User");
const postRouter = require("./routes/Post");
const seedRouter = require("./routes/Seed");

const app = express();

const whitelist = [
  "https://mongolikes-app.vercel.app",
  "http://localhost:3000",
];

// middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        const message = "this origin is not allowed under CORS policy.";
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);
app.use(morgan("tiny"));
app.use(cookieParser());

// routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/seed", seedRouter);

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
  })
  .catch((err) => console.log(err));
