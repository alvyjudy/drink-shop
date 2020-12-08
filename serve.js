const {app} = require("./src/index.js");

if (process.env.ENV === "local") {
  app.listen(3002)
} else {
  app.listen(process.env.PORT)
}
