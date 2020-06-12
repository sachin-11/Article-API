const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Article = require('../models/Article');

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
  //Add user to req.body
  req.body.user = req.user.id;
  //Check for published atricle
  const publishedArticle = await Article.findOne({ user: req.user.id });
  //if user is not an admin , they can add one bootcamp
  if (publishedArticle && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user with id ${req.user.id} has already publish bootcamp`,
        400
      )
    );
  }
  const article = await Article.create(req.body);
  res.status(200).json({ success: true, data: article });
});
