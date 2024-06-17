const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const multer = require('multer');

const router = express.Router();

// Handles POST request with new user data
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id`;
  pool.query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

// Get user profile
router.get('/profile', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT username, email, profile_picture, group_name, is_leader FROM "user" WHERE id = $1`;
  pool.query(queryText, [req.user.id])
    .then(result => res.send(result.rows[0]))
    .catch(err => {
      console.log('Error getting user profile:', err);
      res.sendStatus(500);
    });
});

// Update user profile
router.put('/profile', rejectUnauthenticated, (req, res) => {
  const { username, email, group_name } = req.body;
  const queryText = `UPDATE "user" SET username = $1, email = $2, group_name = $3 WHERE id = $4`;
  pool.query(queryText, [username, email, group_name, req.user.id])
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log('Error updating user profile:', err);
      res.sendStatus(500);
    });
});

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user.id}-${Date.now()}-${file.originalname}`)
  }
});

const upload = multer({ storage: storage });

// Upload profile picture
router.post('/profile_picture', rejectUnauthenticated, upload.single('profile_picture'), (req, res) => {
  const queryText = `UPDATE "user" SET profile_picture = $1 WHERE id = $2`;
  pool.query(queryText, [req.file.path, req.user.id])
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.log('Error uploading profile picture:', err);
      res.sendStatus(500);
    });
});

// Fetch logged-in user data
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      profile_picture: req.user.profile_picture,
      group_name: req.user.group_name,
      is_leader: req.user.is_leader,
    });
  } else {
    res.sendStatus(403); // Forbidden
  }
});

module.exports = router;
