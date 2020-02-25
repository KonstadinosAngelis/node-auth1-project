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
  let { username, password } = req.headers;
  console.log(req.session)

  User.findBy({ username })
    .first()
    .then(login => {
      if (login && bcrypt.compareSync(password, login.password)){
        req.session.loggedIn = true;
        req.session.username = login.username
        res.status(200).json({successMessage: `Welcome ${login.username}!`})
      } else {
        res.status(401).json({errorMessage: "Invalid Credentials"})
      }
    })
    .catch(err => res.status(500).json({errorMessage: `Something wrong with the server ${err}`}))
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({
          errorMessage: "failed to log out"
        })
      } else {
        res.status(200).json({ successMessage: "succesfully logged out"})
      }
    })
  } else {
    res.status(200).json({errorMessage: "must be logged in to log out"})
  }
})

module.exports = router;