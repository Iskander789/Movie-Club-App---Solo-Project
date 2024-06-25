const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Route to fetch user groups
router.get('/user', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT g.*, gm.is_leader 
    FROM groups g 
    JOIN group_members gm ON g.id = gm.group_id 
    WHERE gm.user_id = $1`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            console.log('User groups:', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.error('Error fetching user groups:', error);
            res.sendStatus(500);
        });
});

// Route to fetch other groups
router.get('/other', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT g.* 
    FROM groups g 
    LEFT JOIN group_members gm ON g.id = gm.group_id AND gm.user_id = $1 
    WHERE gm.user_id IS NULL`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            console.log('Other groups:', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.error('Error fetching other groups:', error);
            res.sendStatus(500);
        });
});

// Route to fetch group details
router.get('/:id', rejectUnauthenticated, async (req, res) => {
    const groupId = req.params.id;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Fetch group details
        const groupQuery = `SELECT * FROM groups WHERE id = $1`;
        const groupResult = await client.query(groupQuery, [groupId]);
        const groupDetails = groupResult.rows[0];

        // Fetch group leader
        const leaderQuery = `
        SELECT u.id, u.username 
        FROM "user" u 
        JOIN group_members gm ON u.id = gm.user_id 
        WHERE gm.group_id = $1 AND gm.is_leader = true`;
        const leaderResult = await client.query(leaderQuery, [groupId]);
        const groupLeader = leaderResult.rows[0];

        // Fetch group members
        const membersQuery = `
        SELECT u.id, u.username 
        FROM "user" u 
        JOIN group_members gm ON u.id = gm.user_id 
        WHERE gm.group_id = $1 AND gm.is_leader = false`;
        const membersResult = await client.query(membersQuery, [groupId]);
        const groupMembers = membersResult.rows;

        await client.query('COMMIT');

        res.send({ groupDetails, groupLeader, groupMembers });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error fetching group details:', error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
});

// Route to fetch group messages
router.get('/:id/messages', rejectUnauthenticated, (req, res) => {
    const groupId = req.params.id;
    const queryText = `SELECT m.*, u.username FROM messages m JOIN "user" u ON m.user_id = u.id WHERE m.group_id = $1 ORDER BY m.created_at ASC`;
    pool.query(queryText, [groupId])
        .then((result) => {
            console.log('Group messages:', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.error('Error fetching group messages:', error);
            res.sendStatus(500);
        });
});

// Route to create a new group
router.post('/', rejectUnauthenticated, async (req, res) => {
    const { name, description } = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Check if group name already exists
        const checkQuery = 'SELECT id FROM groups WHERE name = $1';
        const checkResult = await client.query(checkQuery, [name]);

        if (checkResult.rows.length > 0) {
            await client.query('ROLLBACK');
            res.status(400).send({ error: 'Group name already exists' });
            return;
        }

        const groupQuery = `
      INSERT INTO groups (name, description) 
      VALUES ($1, $2) 
      RETURNING id`;
        const groupResult = await client.query(groupQuery, [name, description]);
        const groupId = groupResult.rows[0].id;

        const memberQuery = `
      INSERT INTO group_members (user_id, group_id, is_leader) 
      VALUES ($1, $2, $3)`;
        await client.query(memberQuery, [req.user.id, groupId, true]);

        await client.query('COMMIT');
        res.status(201).send({ id: groupId });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating new group:', error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
});

// Route to add a group member
router.post('/:groupId/members', rejectUnauthenticated, (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;
    const queryText = `
    INSERT INTO group_members (user_id, group_id) 
    VALUES ($1, $2) 
    RETURNING id`;
    pool.query(queryText, [userId, groupId])
        .then((result) => res.status(201).send(result.rows[0]))
        .catch((error) => {
            console.error('Error adding group member:', error);
            res.sendStatus(500);
        });
});

// Route to remove a group member
router.delete('/:groupId/members/:userId', rejectUnauthenticated, (req, res) => {
    const { groupId, userId } = req.params;
    const queryText = `
    DELETE FROM group_members 
    WHERE user_id = $1 AND group_id = $2`;
    pool.query(queryText, [userId, groupId])
        .then(() => res.sendStatus(204))
        .catch((error) => {
            console.error('Error removing group member:', error);
            res.sendStatus(500);
        });
});

// Route to delete a group
router.delete('/:groupId', rejectUnauthenticated, (req, res) => {
    const { groupId } = req.params;
    const queryText = `
    DELETE FROM groups 
    WHERE id = $1`;
    pool.query(queryText, [groupId])
        .then(() => res.sendStatus(204))
        .catch((error) => {
            console.error('Error deleting group:', error);
            res.sendStatus(500);
        });
});

module.exports = router;
