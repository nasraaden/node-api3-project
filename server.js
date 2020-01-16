const express = require('express');

const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter")

const server = express();

//custom middleware
function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl} on ${Date()}`)
  next();
}

server.use(logger);

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
