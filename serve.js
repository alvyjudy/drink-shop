const {app} = require("./src/index.js");
const {dbInit} = require("./src/dbInit");

if (process.env.ENV === "local") {
  dbInit().then(res=>{
    app.listen(3002, ()=>{console.log("App listening on port 3001")})
  })
} else {
  app.listen(process.env.PORT, ()=>{console.log("App listening on port " + process.env.PORT)})
}
