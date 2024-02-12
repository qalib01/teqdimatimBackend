let express = require('express');
let router = express.Router();
const { originCheck } = require('../middlewares/checkOrigin.js');
const { getFaqs } = require('../controllers/getFaqs.js');
const { getProducts, getProductById, getProductByCategory } = require('../controllers/getProducts.js');
const { getCategories, getPopularCategories } = require('../controllers/getCategories.js');
const { getCarousels } = require('../controllers/getCarousels.js');
const { getTeamMembers } = require('../controllers/getTeamMembers.js');
const { getTestimonials } = require('../controllers/getTestimonials.js');
const { postContactMessages } = require('../controllers/postContactMessages.js');
const { checkUserDiscountRequests } = require('../controllers/checkUserRequests.js');
const { postSubscribers, deleteSubscriber } = require('../controllers/subscribers.js');
const { getValidOrderRequest } = require('../controllers/getValidOrderRequest.js');
const { updateUserRequest } = require('../controllers/updateRequest.js');
const { createCustomOrder, createProductOrder } = require('../controllers/createOrder.js');
const { getDiscounts, getLanguages, getPrograms, getUniversities } = require('../controllers/getElements.js');




router.get('/', originCheck);
router.get('*', originCheck);

/* GET faqs data. */
router.get('/faqs', originCheck, getFaqs );

/* GET products data. */
router.get('/products', originCheck, getProducts);

/* GET categories data. */
router.get('/categories', originCheck, getCategories);

/* GET categories data. */
router.get('/discounts', originCheck, getDiscounts);

/* GET product data by id. */
router.get('/product/find_by_id', originCheck, getProductById);

/* GET products data by category. */
router.get('/product/find_by_category', originCheck, getProductByCategory);

/* GET carousels data. */
router.get('/carousels', originCheck, getCarousels);

/* GET team_members data. */
router.get('/team_members', originCheck, getTeamMembers);

/* GET testimonials data. */
router.get('/testimonials', originCheck, getTestimonials);

/* POST contact data. */
router.post('/contact', originCheck, postContactMessages);

/* POST subscribe data. */
router.post('/subscribe', originCheck, postSubscribers);
router.get('/unsubscribe', originCheck, deleteSubscriber);

/* GET check_user_discount_request data. */
router.get('/check_user_discount_request', originCheck, checkUserDiscountRequests);

/* UPDATE User Request data. */
router.put('/update_user_request', originCheck, updateUserRequest);

/* POST user custom order data. */
router.post('/create_custom_order', originCheck, createCustomOrder);

/* POST user product order data. */
router.post('/create_product_order', originCheck, createProductOrder);

/* GET popular_categories data. */
router.get('/popular_categories', originCheck, getPopularCategories);

router.get('/order/:slug', originCheck, getValidOrderRequest);


router.get('/get_languages', originCheck, getLanguages);
router.get('/get_programs', originCheck, getPrograms);
router.get('/get_universities', originCheck, getUniversities);

module.exports = router;