const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Fetch user groups
router.get('/user', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM groups WHERE user_id = $1`;
  pool.query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching user groups:', error);
      res.sendStatus(500);
    });
});

// Fetch other groups
router.get('/other', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM groups WHERE user_id != $1`;
  pool.query(queryText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.error('Error fetching other groups:', error);
      res.sendStatus(500);
    });
});

// Fetch group details
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM groups WHERE id = $1`;
  pool.query(queryText, [req.params.id])
    .then((result) => res.send(result.rows[0]))
    .catch((error) => {
      console.error('Error fetching group details:', error);
      res.sendStatus(500);
    });
});

// Create a new group
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

// Update a group
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const { name, description } = req.body;
  const queryText = `UPDATE groups SET name = $1, description = $2 WHERE id = $3 AND user_id = $4`;
  pool.query(queryText, [name, description, req.params.id, req.user.id])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error('Error updating group:', error);
      res.sendStatus(500);
    });
});

// Delete a group
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM groups WHERE id = $1 AND user_id = $2`;
  pool.query(queryText, [req.params.id, req.user.id])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error('Error deleting group:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
