const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Article = require('../models/Article');
const Employee = require('../models/Employee');

//@desc Get Article
//@route GET /api/v1/atricles
//@access public

exports.getArticles = asyncHandler(async (req, res, next) => {
  const atricles = await Article.find();
  res.status(200).json({ success: true, data: atricles });
});

//@desc Get single atricle
//@route GET /api/v1/atricle/:id
//@access public

exports.getArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id).populate({
    path: 'user',
    select: 'name role',
  });

  if (!article) {
    return next(new ErrorResponse(`No article with id ${req.params.id}`), 404);
  }

  res.status(200).json({ success: true, count: article.length, data: article });
});

//@desc Add atricle
//@route POST  /api/v1/atricles
//@access Private

exports.createAtricle = asyncHandler(async (req, res, next) => {
  req.body.employee = req.params.employeeId;

  const employee = await Employee.findById(req.params.employeeId);

  if (!employee) {
    return next(
      new ErrorResponse(`No bootcamp with id ${req.params.employeeId}`),
      404
    );
  }
  const article = await Article.create(req.body);
  res.status(200).json({ success: true, data: article });
});
