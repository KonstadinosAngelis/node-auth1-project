const express = require('express');

const restricted = require('./routes/auth/restricted-middleware');
const usersRouter = require('./routes/users/user-router');
const authRouter = require('./routes/auth/auth-router');

const session = require('express-session');
const KnexStore = require("connect-session-knex")(session);
const knex = require('./database/dbConfig')

const server = express();

const sessionConfig = {
  name: "monster",
  secret: "epic secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxeAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true,
  },
  store: new KnexStore({
    knex,
    tablename: "sessions",
    createtable: true,
    sidfieldname: "sid",
    clearInterval: 1000 * 60 * 15,
  }),
}

server.use(express.json());
server.use(session(sessionConfig));
server.use('/auth', authRouter);
server.use('/users', restricted, usersRouter);

server.get('/', (req, res) => {
  res.status(200).json({successMessage: "server is working fine"})
})

module.exports = server