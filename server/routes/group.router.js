const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST route to create a new group
router.post('/', rejectUnauthenticated, (req, res) => {
  const { groupName, description } = req.body;
  const userId = req.user.id;

  const queryText = `
    INSERT INTO "group" ("name", "description", "leader_id")
    VALUES ($1, $2, $3)
    RETURNING id;
  `;

  pool.query(queryText, [groupName, description, userId])
    .then(result => res.status(201).send(result.rows[0]))
    .catch(error => {
      console.error('Error creating group:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
