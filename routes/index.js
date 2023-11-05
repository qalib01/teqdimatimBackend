let express = require('express');
let router = express.Router();
let db = require('../models/index.js');


/* GET faq data. */
router.get('/faqs', async (req, res, next) => {
  try {
    const faq_groups = await db.faq_groups.findAll({
      where: {
        status: true,
      },
      include: {
        model: db.faqs,
        as: 'faqs',
        where: {
          status: true,
        },
        // required: true, // Ensure all associated faqs have status: true
      },
    });

    if (!faq_groups || faq_groups.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(faq_groups);
  } catch (error) {
    console.error('Error in /faqs route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});



module.exports = router;