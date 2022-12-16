const mongoose = require("mongoose");

mongoose
  .connect(process.env.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Connecting to Database");
  })

  .catch(() => {
    console.log("Error not connecting to");
  });
