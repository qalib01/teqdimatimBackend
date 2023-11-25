const db = require('../models/index');

let getCarousels = async (req, res) => {
    try {
        const carousels = await db.carousels.findAll({
            where: {
                status: true,
            },
            order: [
                ['createdAt', 'ASC']
            ],
            attributes: [ 'title', 'name', 'key', 'cover_img', 'link' ]
        });

        if (!carousels || carousels.length === 0) {
            return res.status(404).json({ error: 'Not found!' });
        }

        res.json(carousels);
    } catch (error) {
        console.error('Error in /carousels route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = { getCarousels };