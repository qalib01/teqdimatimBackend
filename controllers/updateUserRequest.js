const CryptoJS = require('crypto-js');
const db = require('../models/index');
const { errorMessages } = require('../customMessages/errorMessages');
const { successMessages } = require('../customMessages/successMessages');

let updateUserRequest = async (req, res, next) => {
    let cryptedSlug = decodeURIComponent(req.query.slug);
    let slugBytes = CryptoJS.AES.decrypt(cryptedSlug, process.env.CRYPTO_SECRET_KEY);
    let id = slugBytes.toString(CryptoJS.enc.Utf8);

    await db.order_requests.update({
        surname: req.query.surname,
        phone: req.query.phone,
        university: req.query.university,
        speciality: req.query.speciality,
        degree: req.query.degree,
        course: req.query.course,
        group: req.query.group,
        customer_status: 'confirmed',
    },
    {
        where: {
            id,
        },
    });

    res.status(200).json( successMessages.INFORMATION_UPDATED );
}

let createCustomOrder = async (req, res, next) => {
    let data = req.query;
    let cryptedSlug = decodeURIComponent(data.slug);
    let slugBytes = CryptoJS.AES.decrypt(cryptedSlug, process.env.CRYPTO_SECRET_KEY);
    let id = slugBytes.toString(CryptoJS.enc.Utf8);

    try {
        let hasOrder = await db.custom_orders.findOne({
            where: {
                id,
            }
        });
    
        if (hasOrder) {
            res.status(409).json( errorMessages.ORDER_ALREADY_HAS );
        } else {
            await db.order_requests.update({
                customer_status: 'requested',
                admin_status: 'pending'
            },
            {
                where: {
                    id,
                },
            });
            await db.custom_orders.create({
                id,
                subjectName: data.subjectName,
                topicName: data.topicName,
                orderPrice: data.orderPrice,
                lastOrderPrice: data.lastOrderPrice,
                language: data.language,
                pageCount: data.pageCount,
                program: data.program,
                additionalInformation: data.additionalInformation,
                preparedDate: data.preparedDate,
            });
            res.status(200).json( successMessages.ORDER_REQUEST_SUCCESSFULL );
        }
    } catch (error) {
        res.status(500).json( errorMessages.GENERAL_SERVER_ERROR );
    }
    
}

module.exports = { updateUserRequest, createCustomOrder };