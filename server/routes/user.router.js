const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/register', async (req, res) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `
    INSERT INTO "user" (username, password, email, profile_picture, group_name, is_leader)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
  `;

  try {
    const result = await pool.query(queryText, [username, password, req.body.email, req.body.profile_picture, req.body.group_name, req.body.is_leader]);
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Error in user registration:', error);
    if (error.code === '23505') {  // Unique violation
      res.status(409).json({ message: 'Username already taken' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

router.get('/', rejectUnauthenticated, (req, res) => {
  res.json(req.user);
});

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
});

module.exports = router;
