const bcrypt = require('bcryptjs');

const user = require('../users/user-model');

module.exports = (req, res, next) => {
  if (req.session && req.session.loggedIn){
    next();
  } else {
    res.status(401).json({ errorMessage: "Not authorized"})
  }
}