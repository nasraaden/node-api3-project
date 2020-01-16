const express = require('express');

const postRouter = require("./posts/postRouter.js");

const server = express();

//custom middleware
function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl} at ${Date()}`)
  next();
}

server.use(logger);

server.use("/api/posts", postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
