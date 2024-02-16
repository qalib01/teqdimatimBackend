const CryptoJS = require('crypto-js');
const db = require('../models/index');
const { errorMessages } = require('../customMessages/errorMessages');
const { successMessages } = require('../customMessages/successMessages');

const getIDs = (data) => {
    let cryptedSlug = decodeURIComponent(data.slug);
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

    return {customerId, requestId};
}

let createCustomOrder = async (req, res, next) => {
    let data = req.query;
    console.log(data);
    let { customerId, requestId } = getIDs(data);

    try {
        let hasOrder = await db.custom_orders.findOne({
            where: {
                id: requestId,
            }
        });
    
        if (hasOrder != null ? true : false) {
            res.status(409).json( errorMessages.ORDER_ALREADY_HAS );
        } else {
            await db.customer_requests.update({
                customer_status: 'requested',
                admin_status: 'pending'
            },
            {
                where: {
                    id: customerId,
                },
            });
            await db.custom_order_requests.create({
                id: requestId,
                customer_request_id: customerId,
                subject_name: data.subjectName,
                topic_name: data.topicName,
                order_price: data.orderPrice,
                last_order_price: data.lastOrderPrice,
                language: data.language,
                page_count: data.pageCount,
                program: data.program,
                additional_information: data.additionalInformation,
                prepared_date: data.preparedDate,
            });
            res.status(200).json( successMessages.ORDER_REQUEST_SUCCESSFULL );
        }
    } catch (error) {
        res.status(500).json( errorMessages.GENERAL_SERVER_ERROR );
        console.error(error);
    }
    
}

let createProductOrder = async (req, res, next) => {
    let data = req.query;
    let { customerId, requestId } = getIDs(data);

    try {
        let hasOrder = await db.product_order_requests.findOne({
            where: {
                id: requestId,
            }
        });

        if (hasOrder != null ? true : false) {
            res.status(409).json( errorMessages.ORDER_ALREADY_HAS );
        } else {
            await db.customer_requests.update({
                customer_status: 'requested',
                admin_status: 'pending'
            },
            {
                where: {
                    id: customerId,
                },
            });
            await db.product_order_requests.create({
                id: requestId,
                product_id: data.productId,
                customer_request_id: customerId,
                subject_name: data.subjectName,
                last_order_price: data.lastOrderPrice,
                additional_information: data.additionalInformation,
                prepared_date: data.preparedDate,
            });
            res.status(200).json( successMessages.ORDER_REQUEST_SUCCESSFULL );
        }
    } catch (error) {
        res.status(500).json( errorMessages.GENERAL_SERVER_ERROR );
        console.error(error);
    }
    
}

module.exports = { createCustomOrder, createProductOrder };