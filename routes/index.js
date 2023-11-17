let express = require('express');
let router = express.Router();
const { originCheck } = require('../middlewares/checkOrigin.js');
const { getFaqs } = require('../controllers/getFaqs.js');
const { getProducts, getProductById, getProductByCategory } = require('../controllers/getProducts.js');
const { getCategories } = require('../controllers/getCategories.js');
const { getCarousels } = require('../controllers/getCarousels.js');
const { getTeamMembers } = require('../controllers/getTeamMembers.js');
const { getTestimonials } = require('../controllers/getTestimonials.js');
const { postContactMessages } = require('../controllers/postContactMessages.js');
const { checkUserDiscountRequests } = require('../controllers/checkUserRequests.js');


router.get('/', originCheck);

/* GET faqs data. */
router.get('/faqs', originCheck, getFaqs );

/* GET products data. */
router.get('/products', originCheck, getProducts);

/* GET categories data. */
router.get('/categories', originCheck, getCategories);

/* GET product data by id. */
router.get('/product/find_by_id', originCheck, getProductById);

/* GET products data by category. */
router.get('/product/find_by_category', originCheck, getProductByCategory);

/* GET carousels data. */
router.get('/carousels', originCheck, getCarousels);

/* GET team_members data. */
router.get('/team_members', originCheck, getTeamMembers );

/* GET testimonials data. */
router.get('/testimonials', originCheck, getTestimonials);

/* POST contact data. */
router.post('/contact', originCheck, postContactMessages);

/* GET check_user_discount_request data. */
router.get('/check_user_discount_request', originCheck, checkUserDiscountRequests);

module.exports = router;