let express = require('express');
let router = express.Router();
let db = require('../models/index.js');


/* GET faqs data. */
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

/* GET products data. */
router.get('/products', async (req, res, next) => {
  try {
    const products = await db.products.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: db.product_categories,
          as: 'categories',
        },
        {
          model: db.product_formats,
          as: 'formats',
        },
        {
          model: db.product_languages,
          as: 'languages',
        },
        {
          model: db.product_sizes,
          as: 'sizes',
        }
      ],
      order: [ 
        [ 'createdAt', 'DESC' ]
      ]
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error in /products route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET categories data. */
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await db.product_categories.findAll({
      where: {
        status: true,
      },
      order: [ 
        [ 'createdAt', 'ASC' ]
      ]
    });

    if (!categories || categories.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(categories);
  } catch (error) {
    console.error('Error in /categories route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET product data by id. */
router.get('/product/find_by_id/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    const product = await db.products.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.product_categories,
          as: 'categories',
        },
        {
          model: db.product_formats,
          as: 'formats',
        },
        {
          model: db.product_languages,
          as: 'languages',
        },
        {
          model: db.product_sizes,
          as: 'sizes',
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error in /product route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET products data by category. */
router.get('/product/find_by_category/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    const product = await db.products.findAll({
      include: [
        {
          model: db.product_categories,
          as: 'categories',
          where: {
            id
          }
        },
        {
          model: db.product_formats,
          as: 'formats',
        },
        {
          model: db.product_languages,
          as: 'languages',
        },
        {
          model: db.product_sizes,
          as: 'sizes',
        }
      ],
      order: [ 
        [ 'createdAt', 'ASC' ]
      ]
    });

    if (!product) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error in /product route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET carousels data. */
router.get('/carousels', async (req, res, next) => {
  try {
    const carousels = await db.carousels.findAll({
      where: {
        status: true,
      },
      order: [ 
        [ 'createdAt', 'ASC' ]
      ]
    });

    if (!carousels || carousels.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(carousels);
  } catch (error) {
    console.error('Error in /carousels route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET team_members data. */
router.get('/team_members', async (req, res, next) => {
  try {
    const team_members = await db.team_members.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: db.team_member_social_medias,
          as: 'social_medias',
        }
      ],
    });

    if (!team_members || team_members.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(team_members);
  } catch (error) {
    console.error('Error in /team_members route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET testimonials data. */
router.get('/testimonials', async (req, res, next) => {
  try {
    const testimonials = await db.testimonials.findAll({
      where: {
        status: true,
      },
    });

    if (!testimonials || testimonials.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(testimonials);
  } catch (error) {
    console.error('Error in /testimonials route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});


module.exports = router;