const genres = require("./routers/genres");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/store", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected with database..."))
  .catch((err) => console.log(err, "Fail to connect with database..."));

app.use(express.json());

app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
