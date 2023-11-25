const db = require('../models/index');

let getFaqs = async (req, res) => {
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
                attributes: [ 'question', 'answer', 'keyword', 'link' ],
            },
            attributes: [ 'name', 'title', 'key' ],
        });

        if (!faq_groups || faq_groups.length === 0) {
            return res.status(404).json({ error: 'Not found!' });
        }

        const ip = req.connection.remoteAddress;
        console.log('ip: ', ip);
        res.json(faq_groups);
    } catch (error) {
        console.error('Error in /faqs route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = { getFaqs };