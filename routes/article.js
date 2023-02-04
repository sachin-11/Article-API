const express = require('express');
const router = express.Router();
const {
  getArticle,
  getArticles,
  createAtricle,
  updateAtricle
} = require('../controllers/article');

const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getArticles).post(createAtricle)
router.put('/:articleId', updateAtricle)
router.route('/:id').get(getArticle);

module.exports = router;
