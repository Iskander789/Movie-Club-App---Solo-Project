const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// Handles POST request to create a new group
router.post('/', rejectUnauthenticated, (req, res) => {
  const { name } = req.body;
  const leader_id = req.user.id;

  const queryText = `
    INSERT INTO "group" (name, leader_id)
    VALUES ($1, $2)
    RETURNING id, name, leader_id, created_at;
  `;

  pool.query(queryText, [name, leader_id])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.log('Error creating group:', error);
      res.sendStatus(500);
    });
});

// Handles GET request to fetch all groups for the logged-in user
router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;

  const queryText = `
    SELECT "group".id, "group".name, "group".leader_id, "group".created_at
    FROM "group"
    JOIN "user_group" ON "group".id = "user_group".group_id
    WHERE "user_group".user_id = $1;
  `;

  pool.query(queryText, [userId])
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => {
      console.log('Error fetching groups:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
