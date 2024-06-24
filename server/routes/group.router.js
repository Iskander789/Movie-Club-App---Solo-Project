const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Route to fetch user groups
router.get('/user', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM groups WHERE user_id = $1`;
  pool.query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching user groups:', error);
      res.sendStatus(500);
    });
});

// Route to fetch other groups
router.get('/other', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM groups WHERE user_id != $1`;
  pool.query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching other groups:', error);
      res.sendStatus(500);
    });
});

// Route to create a new group
router.post('/', rejectUnauthenticated, async (req, res) => {
  const { name, description } = req.body;

  try {
    // Check if a group with the same name already exists
    const checkQuery = `SELECT * FROM groups WHERE name = $1`;
    const checkResult = await pool.query(checkQuery, [name]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Group name already exists' });
    }

    // Insert the new group if the name does not exist
    const queryText = `INSERT INTO groups (name, description, user_id) VALUES ($1, $2, $3) RETURNING id`;
    const result = await pool.query(queryText, [name, description, req.user.id]);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error('Error creating new group:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
