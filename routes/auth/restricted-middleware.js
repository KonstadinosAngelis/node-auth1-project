const bcrypt = require('bcryptjs');

const user = require('../users/user-model');

module.exports = (req, res, next) => {
  let { username, password } = req.headers;
  console.log(username)
  console.log(password)

  if(username && password) {
    user.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
          next();
        } else {
          res.status(401).json({errorMessage: "Invalid Credentials"})
        }
      })
      .catch(err => res.status(500).json({errorMessage: err}))
  } else{
    res.status(400).json({errorMessage: "Please provide valid credentials"})
  }
}