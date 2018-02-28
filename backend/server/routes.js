const express = require('express')

const User = require('./models/user')

const router = express.Router()

router.get('/user/:id', (req, res) => {
  User.findById({'_id': req.params.id}, (err, user) => {
    if (err) {
      res.status(400).json(err)
    }
    res.status(200).json(user)
  })
})

router.get('/user', (req, res, next) => {
  User.find({})
    .then(user => {
      res.json({user})
    })
    .catch(next)
})

router.post('/user', (req, res, next) => {
  let newUser = new User(req.body.user)
  if(req.body.user.email === ""
    && req.body.user.password === ""
  || req.body.user.username === "") {
    console.log('user err , field is empty : ',req.body.user);

    res.json({success: false, message: 'Please enter email and password.'});
  } else {
    newUser.save()
      .then(user => {
        res.json({user})
      })
      .catch(next)
  }
})

router.put('/user/:id', function (req, res) {
  User.findOneAndUpdate({'_id': req.params.id},
    {email: req.body.email,
      password: req.body.password,
      username: req.body.username
    },
    {new: true},
    function (err, user) {
      if (err) {
        res.status(400).json(err)
      }
      res.status(200).json(user)
    })
})

router.delete('/user/:id', function (req, res) {
  let id = req.params.id
  Todo.remove({
    _id: id
  }, function () {
    res.json()
  })
})

module.exports = router
