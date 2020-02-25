const express = require('express');

const restricted = require('./routes/auth/restricted-middleware');
const usersRouter = require('./routes/users/user-router');
const authRouter = require('./routes/auth/auth-router');

const server = express();

server.use(express.json());
server.use('/auth', authRouter);
server.use('/users', restricted, usersRouter);

server.get('/', (req, res) => {
  res.status(200).json({successMessage: "server is working fine"})
})

module.exports = server