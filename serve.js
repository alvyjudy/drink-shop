const express = require("express");
const path = require("path");
const {createProxyMiddleware} = require("http-proxy-middleware");

const app = express();

app.use(express.static("dist"));

const BACKEND = (process.env.ENV === "staging" ? 
    "https://alvy-bbt-backend-staging.herokuapp.com" : 
    process.env.ENV === "production" ? 
    "whatever for now" :
    null
)

app.use("/api", createProxyMiddleware({
    target:BACKEND,
    changeOrigin:true,
    pathRewrite:{
        "^/api":""
    }
}))


app.use("/assets", createProxyMiddleware({
    target:"https://alvyjudy.github.io/bbt-shop-media/",
    changeOrigin:true,
}))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"))
})

app.listen(process.env.PORT);