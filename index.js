const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const defaultRouter = require("./routes/index");
const product = require("./api/product");
const authRouter = require("./routes/Auth");
const connectDB = require("./services/mongoose");

const app = express();

// middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

// routes
// app.use("/", defaultRouter);
// app.use("/api/product", product);

//
app.use("/auth", authRouter);
// appuse('/auth', authRouter)

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
  })
  .catch((err) => console.log(err));
