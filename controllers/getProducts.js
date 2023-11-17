const db = require('../models/index');

let getProducts = async (req, res) => {
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
                ['createdAt', 'DESC']
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
}

let getProductById = async (req, res) => {
    try {
        let id = req.query.id;
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
}

let getProductByCategory = async (req, res) => {
    try {
        let id = req.query.id;
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
                ['createdAt', 'ASC']
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
}


module.exports = { getProducts, getProductById, getProductByCategory };