const db = require('../models/index');

let getDiscounts = async (req, res) => {
    try {
        const discounts = await db.discounts.findAll({
            where: {
                status: true,
            },
            order: [
                ['id', 'ASC']
            ],
            attributes: [ 'name', 'key', 'percent', 'description' ],
        });

        res.json(discounts);
    } catch (error) {
        console.error('Error in /getCategories route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = { getDiscounts };