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


module.exports = router;