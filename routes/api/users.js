const express = require('express');
const { deleteUser, getAllUsers, getUser } = require('../../controllers/usersController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const router = express.Router();

router
  .route('/')
  .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route('/:id').get(verifyRoles(ROLES_LIST.Admin), getUser);

module.exports = router;
