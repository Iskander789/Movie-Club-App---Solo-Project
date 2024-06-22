const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// Get all groups for a user
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT g.id, g.name, g.description 
    FROM groups g
    JOIN group_members gm ON gm.group_id = g.id
    WHERE gm.user_id = $1
  `;
  pool.query(queryText, [req.user.id])
    .then(result => res.send(result.rows))
    .catch(err => {
      console.log('Error fetching groups:', err);
      res.sendStatus(500);
    });
});

// Create a new group
router.post('/', rejectUnauthenticated, (req, res) => {
  const { name, description } = req.body;
  const queryText = `
    INSERT INTO groups (name, description)
    VALUES ($1, $2)
    RETURNING id
  `;
  pool.query(queryText, [name, description])
    .then(result => {
      const groupId = result.rows[0].id;
      const memberQueryText = `
        INSERT INTO group_members (group_id, user_id)
        VALUES ($1, $2)
      `;
      return pool.query(memberQueryText, [groupId, req.user.id]);
    })
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.log('Error creating group:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
