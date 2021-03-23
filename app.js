const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGODB_URI = process.env.CONNECTION_STRING;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

//middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//mongoose connection
let db = mongoose.connection;
//check for connection
db.once("open", () => {
  console.log("mongoDb connection established !!");
});
//check for DB errors
db.on("error", (err) => {
  console.log(err);
});

//importing auth route
const authRoute = require("./routes/auth");

//Defining middleware for auth route
app.use("/api/user", authRoute);

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
