// server/routes/group.router.js

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
router.post('/', rejectUnauthenticated, (req, res) => {
  const { name, description } = req.body;
  const queryText = `INSERT INTO groups (name, description, user_id) VALUES ($1, $2, $3) RETURNING id`;
  pool.query(queryText, [name, description, req.user.id])
    .then((result) => res.status(201).send(result.rows[0]))
    .catch((error) => {
      console.error('Error creating new group:', error);
      res.sendStatus(500);
    });
});

// Route to fetch group details
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM groups WHERE id = $1`;
  pool.query(queryText, [req.params.id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.sendStatus(404);
      }
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.error('Error fetching group details:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
