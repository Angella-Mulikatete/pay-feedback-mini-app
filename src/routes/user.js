const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../controllers/user');

router.post('/'.createUser);
router.get('/:id', getUser);
router.get('/:wallet', getUserByWallet);

// router.route('/')
// .get(getUser)
// .post(createUser);

module.exports = router;
