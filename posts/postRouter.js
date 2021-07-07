const express = require('express');

const router = express.Router();

const Posts = require("./postDb.js")

router.get('/', (req, res) => {
  Posts.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: "The posts information could not be retrieved."})
  })
});

router.get('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  Posts.getById(id)
  .then(post => {
    if (post.length !== 0) {
      res.status(200).json(post)
    } else {
      res.status(404).json({message: "The post with the specified ID does not exist." })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: "The post information could not be retrieved." })
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  const id = req.params.id;
  Posts.remove(id)
  .then(post => {
    if(post.length != 0) {
      Posts.remove(id)
        .then(deleted => {
          res.status(200).json(deleted)
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({error: "The post could not be removed." })
        })
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist." })
      }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "The post could not be removed." })
  })
});

router.put('/:id', validatePostId, (req, res) => {
  const postData = req.body;
  Posts.update(postData)
  .then(post => {
      res.status(200).json(post)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({ error: "There was an error while saving the user to the database." })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;
  Posts.getById(id)
  .then(post => {
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(400).json({ message: "Invalid post id."})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: "There is an error getting this post."})
  })
}

module.exports = router;
