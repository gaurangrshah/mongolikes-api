const mongoose = require("mongoose");
require("dotenv").config();

// instantiate db
const connectDB = async () => {
  const connection = await new mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
