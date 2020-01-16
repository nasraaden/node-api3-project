const express = require('express');

const router = express.Router();

const Users = require("./userDb.js");

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(users => {
      res.status(201).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "There was an error while saving the user to the database."})
    })
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: "There was an error while saving the user to the database"})
    })
});

router.get('/', (req, res) => {
  Users.get()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: "The user information could not be retrieved."})
      })
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      if (user.length !== 0) {
        res.status(200).json(user)
      } else {
        res.status(404).json({message: "The user with the specified ID does not exist." })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "The user information could not be retrieved." })
    })
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(post => {
    if(response.length != 0){
      res.status(200).json(post)
    } else{
      res.status(404).json({message: "The post with the specified ID does not exist." })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "The user posts information could not be retrieved."})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  Users.getById(id)
  .then(user => {
    if(user.length != 0) {
      Users.remove(id)
        .then(deleted => {
          res.status(200).json(deleted)
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({error: "The user could not be removed." })
        })
      } else {
        res.status(404).json({message: "The user with the specified ID does not exist." })
      }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "The user could not be removed." })
  })
});

router.put('/:id', validateUserId, (req, res) => {
  const userData = req.body;
  Users.insert(userData)
  .then(post => {
      res.status(200).json(post)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({ error: "There was an error while saving the user to the database." })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  Users.getById(id)
  .then(user => {
    if (user) {
      req.user = user
      next();
    } else {
      res.status(400).json({ message: "Invalid user id."})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: "There is an error getting this user."})
  })
}

function validateUser(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: "Missing user data"})
  }  else if (!body.name){
    res.status(400).json({ message: "Missing required name field"})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: "Missing user data"})
  } else if (!body.text){
    res.status(400).json({ message: "Missing required text field"})
  } else {
    next();
  }
}

module.exports = router;
