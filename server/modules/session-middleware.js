const expressSession = require('express-session');
const PgSession = require('connect-pg-simple')(expressSession);
const pool = require('./pool.js');
const warnings = require('../constants/warnings');

const serverSessionSecret = () => {
  if (
    !process.env.SERVER_SESSION_SECRET ||
    process.env.SERVER_SESSION_SECRET.length < 8 ||
    process.env.SERVER_SESSION_SECRET === warnings.exampleBadSecret
  ) {
    console.log(warnings.badSecret);
  }
  return process.env.SERVER_SESSION_SECRET;
};

let pruneSessionInterval = 60;
if (process.env.NODE_ENV === 'test') {
    pruneSessionInterval = false;
}

module.exports = expressSession({
    store: new PgSession({
        pool,
        pruneSessionInterval,
        createTableIfMissing: true,
    }),
    secret: serverSessionSecret() || 'secret', // please set this in your .env file
    name: 'user', // this is the name of the req.variable. 'user' is convention, but not required
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // cookie expires after 7 days
      httpOnly: true, // prevents client-side JS from accessing cookie
      secure: false // can only be set to true if the app uses https
    },
});
