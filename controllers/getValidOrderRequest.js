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

    let isPending = 'pending';
    let isClicked = 'clicked';
    let isConfirmed = 'confirmed';
    let isRequested = 'requested';
    let isCancelled = 'cancelled';

    const checkHasRequest = async (id) => {
        let hasRequest = null;
        if (id != undefined) {
            hasRequest = await db.customer_requests.findOne({
                where: {
                    id,
                }
            });
        }
        return hasRequest;
    }

    try {
        let hasRequest = await checkHasRequest(customerId);
        if (hasRequest != null || undefined ? true : false) {
            if (hasRequest.customer_status === isClicked || hasRequest.customer_status === isConfirmed) {
                try {
                    let validRequest = await db.customer_requests.findOne({
                        include: [
                            {
                                model: sequelize.model('discounts'),
                                as: 'discount',
                                attributes: ['name', 'key', 'percent'],
                            }
                        ],
                        where: {
                            id: customerId,
                        },
                        attributes: ['name', 'surname', 'email', 'phone', 'university_key', 'speciality', 'degree', 'course', 'group'],
                    });
                    res.status(200).json(validRequest);
                } catch (error) {
                    console.log('test');
                    res.status(500).json(errorMessages.GENERAL_SERVER_ERROR);
                }
            } else if (hasRequest && hasRequest.customer_status === isRequested) {
                let validRequest = await db.customer_requests.findOne({
                    include: [
                        {
                            model: sequelize.model('discounts'),
                            as: 'discount',
                            attributes: ['name', 'key', 'percent'],
                        }
                    ],
                    where: {
                        id: customerId,
                    },
                    attributes: ['name', 'email', 'admin_status'],
                });
                res.status(200).json(validRequest);
            } else if (hasRequest && hasRequest.customer_status === isCancelled) {
                let validRequest = await db.customer_requests.findOne({
                    include: [
                        {
                            model: sequelize.model('discounts'),
                            as: 'discount',
                            attributes: ['name', 'key', 'percent'],
                        }
                    ],
                    where: {
                        id: customerId,
                    },
                    attributes: ['name', 'email', 'customer_status'],
                });
                res.status(200).json(validRequest);
            } else {
                await db.customer_requests.update({
                    customer_status: isClicked,
                },
                    {
                        where: {
                            id: customerId,
                        },
                    });
                let validRequest = await db.customer_requests.findOne({
                    include: [
                        {
                            model: sequelize.model('discounts'),
                            as: 'discount',
                            attributes: ['name', 'key', 'percent'],
                        }
                    ],
                    where: {
                        id: customerId,
                    },
                    attributes: ['name', 'email'],
                });
                res.status(200).json(validRequest);
            }
        } else {
            res.status(404);
        }
    } catch (error) {
        res.status(500).json(errorMessages.GENERAL_SERVER_ERROR);
        console.log(error);
    }
}

module.exports = { getValidOrderRequest }