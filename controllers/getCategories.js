const db = require('../models/index');

let getCategories = async (req, res) => {
    try {
        const categories = await db.product_categories.findAll({
            where: {
                status: true,
            },
            order: [
                ['createdAt', 'ASC']
            ],
            attributes: [ 'name', 'key', 'cover_img', 'description' ],
        });

        if (!categories || categories.length === 0) {
            return res.status(404).json({ error: 'Not found!' });
        }

        res.json(categories);
    } catch (error) {
        console.error('Error in /getCategories route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

let getPopularCategories = async (req, res) => {
    try {
        const products = await db.products.findAll({
            where: {
                status: true,
            },
            order: [
                ['createdAt', 'ASC']
            ],
            attributes: [ 'category_id' ],
        });
        console.log(products);

        const categories = await db.product_categories.findAll({
            where: {
                status: true,
            },
            attributes: [ 'name', 'key', 'cover_img' ],
        })

        let popularCategories;

        if(categories) {
            // Map category counts to category objects
            let categoryCount = products.reduce((acc, product) => {
                const categoryId = product.category_id;
                acc[categoryId] = (acc[categoryId] || 0) + 1;
                return acc;
            }, {});

            // Map category counts to category objects
            const categoriesWithCount = categories.map(category => ({
                category,
                count: categoryCount[category.id] || 0,
            }));
            popularCategories = categoriesWithCount.sort((a, b) => b.count - a.count)
        }

        res.json(popularCategories);
    } catch (error) {
        console.error('Error in /getPopularCategories route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = { getCategories, getPopularCategories };