const CryptoJS = require('crypto-js');
const db = require('../models/index');
const { errorMessages } = require('../customMessages/errorMessages');
const { successMessages } = require('../customMessages/successMessages');

let updateUserRequest = async (req, res, next) => {
    let cryptedSlug = decodeURIComponent(req.query.slug);
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

    try {
        let isCustomer = await db.customers.findOne({
            where: {
                id: customerId,
            }
        });
    
        if (isCustomer.customer_status !== 'confirmed') {
            await db.customer_requests.update({
                surname: req.query.surname,
                phone: req.query.phone,
                university_key: req.query.university_key,
                speciality: req.query.speciality,
                degree: req.query.degree,
                course: req.query.course,
                group: req.query.group,
                customer_status: 'confirmed',
            },
            {
                where: {
                    id: customerId,
                },
            });
        }
        res.status(200).json( successMessages.INFORMATION_UPDATED );
    } catch (error) {
        res.status(500).json( errorMessages.GENERAL_SERVER_ERROR );
        console.error(error);
    }
}

let createCustomOrder = async (req, res, next) => {
    let data = req.query;
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

    try {
        let hasOrder = await db.custom_order_requests.findOne({
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
            console.log('Burda error olur!!!!');
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

module.exports = { updateUserRequest, createCustomOrder };