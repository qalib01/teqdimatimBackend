const db = require('../models/index');

let getTestimonials = async (req, res) => {
    try {
        const testimonials = await db.testimonials.findAll({
            where: {
                status: true,
            },
            attributes: [ 'name', 'surname', 'profession', 'profile_picture', 'opinion' ],
        });

        if (!testimonials || testimonials.length === 0) {
            // return res.status(404).json({ error: 'Not found!' });
            return res.status(404);
        }

        res.json(testimonials);
    } catch (error) {
        console.error('Error in /testimonials route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = { getTestimonials };