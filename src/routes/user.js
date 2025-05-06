const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../controllers/user');

// router.post('/').post(createUser);
// router.get('/:id', getUser);
router.route('/')
.get(getUser)
.post(createUser);

module.exports = router;
