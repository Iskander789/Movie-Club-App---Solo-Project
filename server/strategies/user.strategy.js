const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query('SELECT * FROM "user" WHERE id = $1', [id])
    .then((result) => {
      const user = result && result.rows && result.rows[0];
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => {
      console.error('Error when selecting user on session deserialize', err);
      done(err, null);
    });
});

passport.use('local', new LocalStrategy((username, password, done) => {
  pool.query('SELECT * FROM "user" WHERE username = $1', [username])
    .then((result) => {
      const user = result && result.rows && result.rows[0];
      if (user && encryptLib.comparePassword(password, user.password)) {
        done(null, user);
      } else {
        done(null, false, { message: 'Incorrect username or password.' });
      }
    })
    .catch((err) => {
      console.error('Error when selecting user on login', err);
      done(err, null);
    });
}));

module.exports = passport;
