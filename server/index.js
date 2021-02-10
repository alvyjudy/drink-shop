const api = require("./src/api.js");
const { dbInit } = require("./src/dbInit");
const express = require("express");
const app = express();

app.use("/assets", express.static("assets"));
app.use("/api", api);
app.use(express.static("dist"));

if (process.env.NODE_ENV === "development") {
  dbInit().then((res) => {
    app.listen(3002, () => {
      console.log("App listening on port 3002");
    });
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log("App listening on port " + process.env.PORT);
  });
}
