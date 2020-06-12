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

exports.createEmployee = asyncHandler(async (req, res, next) => {
  // //Add user to req.body
  // req.body.user = req.user.id;
  // //Check for published atricle
  // const publishedArticle = await Article.findOne({ user: req.user.id });
  // //if user is not an admin , they can add one bootcamp
  // if (publishedArticle && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `The user with id ${req.user.id} has already publish bootcamp`,
  //       400
  //     )
  //   );
  // }
  const article = await Employee.create(req.body);
  res.status(200).json({ success: true, data: article });
});
