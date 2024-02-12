const db = require('../models/index');

let getDiscounts = async (req, res) => {
    try {
        const data = await db.discounts.findAll({
            where: {
                status: true,
            },
            order: [
                ['id', 'ASC']
            ],
            attributes: [ 'name', 'key', 'percent', 'description' ],
        });

        res.json(data);
    } catch (error) {
        console.error('Error in /getDiscounts route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

let getPrograms = async (req, res) => {
    try {
        const data = await db.product_programs.findAll({
            where: {
                status: true,
            },
            attributes: [ 'name', 'key', 'scale' ],
        });

        res.json(data);
    } catch (error) {
        console.error('Error in /getPrograms route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

let getLanguages = async (req, res) => {
    try {
        const data = await db.product_languages.findAll({
            where: {
                status: true,
            },
            attributes: [ 'name', 'key', 'scale' ],
        });
        
        res.json(data);
    } catch (error) {
        console.error('Error in /getLanguages route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

let getUniversities = async (req, res) => {
    try {
        const data = await db.universities.findAll({
            where: {
                status: true,
            },
            attributes: [ 'id', 'name' ],
        });

        res.json(data);
    } catch (error) {
        console.error('Error in /getUniversities route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

let getSocialMedias = async (req, res) => {
    try {
        const data = await db.social_medias.findAll({
            where: {
                status: true,
            },
            attributes: [ 'name', 'key', 'link', 'icon' ],
        });

        res.json(data);
    } catch (error) {
        console.error('Error in /getSocialMedias route:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

module.exports = { getDiscounts, getPrograms, getLanguages, getUniversities, getSocialMedias };