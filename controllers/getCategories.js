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
            attributes: [ 'title', 'name', 'key', 'cover_img', 'description', 'price' ],
        });

        if (!categories || categories.length === 0) {
            return res.status(404).json({ error: 'Not found!' });
        }

        res.json(categories);
    } catch (error) {
        console.error('Error in /categories route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = { getCategories };