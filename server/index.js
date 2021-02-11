const api = require("./src/api.js");
const path = require("path");
const { dbInit } = require("./src/dbInit");
const express = require("express");
const app = express();

app.use("/assets", express.static("assets"));
app.use("/assets/*", (req, res)=>{
  res.status(404).send("assets not found");
})
app.use("/api", api);
app.use(express.static("dist"));
app.use("*", (req, res)=>{
  res.sendFile(path.join(__dirname, "dist/index.html"));
})

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
