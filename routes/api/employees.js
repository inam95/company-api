const express = require('express');
const {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
} = require('../../controllers/employeesController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

const router = express.Router();

router
  .route('/')
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

router.route('/:id').get(getEmployee);

module.exports = router;
