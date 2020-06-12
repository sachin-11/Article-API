const express = require('express');
const router = express.Router();
const {} = require('../controllers/employee');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getArticles)
  .post(protect, authorize('publisher', 'admin'), createAtricle);
router.route('/:id').get(getArticle);

module.exports = router;
