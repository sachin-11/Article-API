const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Employee = require('../models/Article');

//@desc Get Article
//@route GET /api/v1/atricles
//@access public

exports.getEmployee = asyncHandler(async (req, res, next) => {
  const Employee = await Employee.find();
  res.status(200).json({ success: true, data: atricles });
});
