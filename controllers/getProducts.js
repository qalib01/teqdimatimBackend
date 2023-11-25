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
                    attributes: [ 'name', 'key', 'cover_img' ],
                },
                {
                    model: db.product_formats,
                    as: 'formats',
                    attributes: [ 'name', 'key' ],
                },
                {
                    model: db.product_languages,
                    as: 'languages',
                    attributes: [ 'name', 'key' ],
                },
                {
                    model: db.product_sizes,
                    as: 'sizes',
                    attributes: [ 'name', 'key' ],
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: [ 'id', 'title', 'name', 'key', 'cover_img', 'description', 'price' ],
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
                    attributes: [ 'id', 'name', 'key', 'cover_img' ],
                },
                {
                    model: db.product_formats,
                    as: 'formats',
                    attributes: [ 'name', 'key' ],
                },
                {
                    model: db.product_languages,
                    as: 'languages',
                    attributes: [ 'name', 'key' ],
                },
                {
                    model: db.product_sizes,
                    as: 'sizes',
                    attributes: [ 'name', 'key' ],
                }
            ],
            attributes: [ 'id', 'title', 'name', 'key', 'cover_img', 'description', 'price' ],
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
                    },
                    attributes: [ 'name', 'key', 'cover_img' ],
                },
                {
                    model: db.product_formats,
                    as: 'formats',
                    attributes: [ 'name', 'key' ],
                },
                {
                    model: db.product_languages,
                    as: 'languages',
                    attributes: [ 'name', 'key' ],
                },
                {
                    model: db.product_sizes,
                    as: 'sizes',
                    attributes: [ 'name', 'key' ],
                }
            ],
            order: [
                ['createdAt', 'ASC']
            ],
            attributes: [ 'id', 'title', 'name', 'key', 'cover_img', 'description', 'price' ],
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