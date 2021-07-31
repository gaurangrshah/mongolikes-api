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

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://mongolikes-app.vercel.app",
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
