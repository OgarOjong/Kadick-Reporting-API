const express = require("express");
const app = express();
const port = process.env.PORT || 3020;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { APIResponse } = require("./models/APIResponse");
dotenv.config();
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");

const MONGODB_URI = process.env.CONN_STRING;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

// //middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(express.json());
app.use(fileupload({ useTempFiles: true }));

//mongoose connection
let db = mongoose.connection;
//check for connection
db.once("open", () => {
  console.log("mongoDb connection established !!");
});
//check for DB errors
db.on("error", (err) => {
  APIResponse(500, false, "DB error", null);
  console.log(err);
});

//importing auth route
const authRoute = require("./routes/auth");
// const crudRoute = require("./routes/crud");
const reportRoute = require("./routes/report");

//Defining middleware for auth route
app.use("/api/user", authRoute);
app.use("/api/report", reportRoute);
// app.use("/api", crudRoute);
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "SOMETHING WENT WRONG !!" } = err;
  res.status(statusCode).json(message);
});

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
