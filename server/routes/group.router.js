const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Handles creating a new group
router.post('/', rejectUnauthenticated, (req, res) => {
  const { name } = req.body;
  const queryText = `INSERT INTO "groups" (name, leader_id) VALUES ($1, $2) RETURNING id`;
  pool.query(queryText, [name, req.user.id])
    .then(result => res.status(201).send(result.rows[0]))
    .catch(error => {
      console.error('Error creating group:', error);
      res.sendStatus(500);
    });
});

// Get all groups for the logged-in user
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT * FROM "groups"
    WHERE id IN (
      SELECT group_id FROM "group_members" WHERE user_id = $1
    )`;
  pool.query(queryText, [req.user.id])
    .then(result => res.status(200).json(result.rows))
    .catch(error => {
      console.error('Error getting user groups:', error);
      res.sendStatus(500);
    });
});

// Add a user to a group
router.post('/:groupId/members', rejectUnauthenticated, (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;
  const queryText = `INSERT INTO "group_members" (group_id, user_id) VALUES ($1, $2)`;
  pool.query(queryText, [groupId, userId])
    .then(() => res.sendStatus(201))
    .catch(error => {
      console.error('Error adding user to group:', error);
      res.sendStatus(500);
    });
});

// Get all members of a group
router.get('/:groupId/members', rejectUnauthenticated, (req, res) => {
  const { groupId } = req.params;
  const queryText = `
    SELECT u.id, u.username, u.email FROM "user" u
    JOIN "group_members" gm ON gm.user_id = u.id
    WHERE gm.group_id = $1`;
  pool.query(queryText, [groupId])
    .then(result => res.status(200).json(result.rows))
    .catch(error => {
      console.error('Error getting group members:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
