const express = require("express");
const path = require("path");
const {createProxyMiddleware} = require("http-proxy-middleware");

const app = express();

app.use(express.static("dist"));

app.use("/api", createProxyMiddleware({
    target:"https://backend-dot-meadowvale.nn.r.appspot.com",
    changeOrigin:true,
    pathRewrite:{
        "^/api":""
    }
}))

app.use("/assets", createProxyMiddleware({
    target:"https://storage.googleapis.com/alvybbt",
    changeOrigin:true,
    pathRewrite:{
        "^/assets":""
    }
}))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"))
})

app.listen(process.env.PORT);