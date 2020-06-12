const express = require('express');
const router = express.Router();
const { getEmployee, createEmployee } = require('../controllers/employee');

router.route('/').get(getEmployee).post(createEmployee);

module.exports = router;
