const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../users/user-model');

const router = express.Router();

router.post('/register', (req, res) => {
  let user = req.body

  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash

  User.add(user)
    .then(newUser => {
      res.status(200).json(newUser)
    })
    .catch(err => res.status(500).json({errorMessage: err}))
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  console.log(username)
  console.log(password)

  User.findBy({ username })
    .first()
    .then(login => {
      if (login && bcrypt.compareSync(password, login.password)){
        res.status(200).json({successMessage: `Welcome ${login.username}!`})
      } else {
        res.status(401).json({errorMessage: "Invalid Credentials"})
      }
    })
    .catch(err => res.status(500).json({errorMessage: `Something wrong with the server ${err}`}))
})

module.exports = router;