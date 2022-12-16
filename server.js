const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./database/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./routes/auth");
const profile = require("./routes/profile");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/api/users", auth);
app.use("/api/profile", profile);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
