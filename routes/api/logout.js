const express = require('express');

const { handleLogout } = require('../../controllers/logoutController');

const router = express.Router();

router.post('/', handleLogout);

module.exports = router;
