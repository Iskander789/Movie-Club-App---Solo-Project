const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET all groups
router.get('/', rejectUnauthenticated, (req, res) => {
  const query = `SELECT * FROM groups WHERE user_id = $1`;
  pool.query(query, [req.user.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.error('Error in GET /api/groups', err);
      res.sendStatus(500);
    });
});

// POST new group
router.post('/', rejectUnauthenticated, (req, res) => {
  const { name, description } = req.body;
  const query = `
    INSERT INTO groups (name, description, user_id)
    VALUES ($1, $2, $3) RETURNING *;
  `;
  pool.query(query, [name, description, req.user.id])
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.error('Error in POST /api/groups', err);
      res.sendStatus(500);
    });
});

module.exports = router;
