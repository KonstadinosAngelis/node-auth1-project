const router = require('express').Router();

const User = require('./user-model')

router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => res.status(500).json({errorMessage: err}))
})

module.exports = router