const CryptoJS = require('crypto-js');
const db = require('../models/index');
const { sequelize } = require('../models/index');
const { errorMessages } = require('../customMessages/errorMessages');

getValidOrderRequest = async (req, res, next) => {
    let cryptedSlug = decodeURIComponent(req.params.slug);
    let slugBytes = CryptoJS.AES.decrypt(cryptedSlug, process.env.CRYPTO_SECRET_KEY);
    let linkSlug = slugBytes.toString(CryptoJS.enc.Utf8);

    const regex = /(?:customer_id=)([0-9a-fA-F-]+)(?:\/request_id=)([0-9a-fA-F-]+)/;
    const matches = linkSlug.match(regex);
    let customerId;
    let requestId;

    if (matches && matches.length >= 3) {
        customerId = matches[1];
        requestId = matches[2];
    }

    const checkIsCustomer = async (id) => {
        let isCustomer = null;
        if (id != undefined) {
            isCustomer = await db.customers.findOne({
                include: [
                    {
                        model: sequelize.model('custom_orders'),
                        as: 'custom_orders',
                        attributes: ['status'],
                        // where: {
                        //     status: false
                        // }
                    },
                    {
                        model: sequelize.model('product_orders'),
                        as: 'product_orders',
                        attributes: ['status'],
                        // where: {
                        //     status: false
                        // }
                    },
                    {
                        model: sequelize.model('customer_discounts'),
                        as: 'discounts',
                        include: [
                            {
                                model: sequelize.model('discounts'),
                                as: 'discount',
                                attributes: ['name', 'percent'],
                            },
                        ],
                        attributes: ['status'],
                        order: [
                            ['createdAt', 'DESC'],
                        ], // Sonuncu customer_discounts üçün sıralama təyin edir
                        limit: 1, // Yalnız sonuncu customer_discounts məlumatını əldə edir
                    },
                    {
                        model: sequelize.model('universities'),
                        as: 'university',
                        attributes: ['name', 'key'],
                    },
                ],
                where: {
                    id,
                },
                attributes: ['name', 'surname', 'email', 'phone', 'speciality', 'degree', 'course', 'group'],
            });
        };
        return isCustomer;
    }

    try {
        let isCustomer = await checkIsCustomer(customerId);
        if (isCustomer != null || undefined ? true : false) {
            res.status(200).json({ isCustomer })
        } else {
            res.status(404).json( errorMessages.REQUEST_NOT_FOUND )
        }
    } catch (error) {
        res.status(500).json(errorMessages.GENERAL_SERVER_ERROR);
        console.log(error);
    }
}

module.exports = { getValidOrderRequest }