const CryptoJS = require('crypto-js');
const db = require('../models/index');
const { errorMessages } = require('../customMessages/errorMessages');

getValidOrderRequest = async (req, res, next) => {
    let cryptedSlug = decodeURIComponent(req.params.slug);
    let slugBytes = CryptoJS.AES.decrypt(cryptedSlug, process.env.CRYPTO_SECRET_KEY);
    let id = slugBytes.toString(CryptoJS.enc.Utf8);
    // let isPending = 'pending';
    // let isClicked = 'clicked';
    // let isConfirmed = 'confirmed';
    // let isRequested = 'requested';
    // let isCancelled = 'cancelled';

    try {
        let hasRequest = await db.order_requests.findOne({
            where: {
                id,
            }
        });

        // if (hasRequest && hasRequest.customer_status === isClicked) {
        //     let validRequest = await db.order_requests.findOne({
        //         where: {
        //             id,
        //         },
        //         attributes: [ 'name', 'email','discountPercent' ],
        //     });
        //     res.status(200).json( validRequest );
        // } else if(hasRequest && hasRequest.customer_status === isConfirmed) {
        //     let validRequest = await db.order_requests.findOne({
        //         where: {
        //             id,
        //         },
        //         attributes: [ 'name', 'surname', 'email', 'phone', 'university', 'speciality', 'degree', 'course', 'group', 'discountPercent' ],
        //     });
        //     res.status(200).json( validRequest );
        // } else if (hasRequest && hasRequest.customer_status === isRequested) {
        //     let validRequest = await db.order_requests.findOne({
        //         where: {
        //             id,
        //         },
        //         attributes: [ 'name', 'email','discountPercent', 'admin_status' ],
        //     });
        //     res.status(200).json( validRequest );
        // } else if (hasRequest && hasRequest.customer_status === isCancelled) {
        //     let validRequest = await db.order_requests.findOne({
        //         where: {
        //             id,
        //         },
        //         attributes: [ 'name', 'email','discountPercent', 'customer_status' ],
        //     });
        //     res.status(200).json( validRequest );
        // } else {
        //     await db.order_requests.update({
        //         customer_status: isClicked,
        //     },
        //     {
        //         where: {
        //             id,
        //         },
        //     });
        //     let validRequest = await db.order_requests.findOne({
        //         where: {
        //             id,
        //         },
        //         attributes: [ 'name', 'email','discountPercent' ],
        //     });
        //     res.status(200).json( validRequest );
        // }


        if (hasRequest) {
            let validRequest = await db.order_requests.findOne({
                where: {
                    id,
                },
                attributes: ['name', 'surname', 'email', 'phone', 'university', 'speciality', 'degree', 'course', 'group', 'discountPercent'],
            });

            res.status(200).json(validRequest);

            await db.order_requests.update({
                customer_status: 'clicked',
            },
                {
                    where: {
                        id,
                    },
                });
        } else {
            res.status(404).json(errorMessages.REQUEST_NOT_FOUND);
        }
    } catch (error) {
        res.status(500).json(errorMessages.GENERAL_SERVER_ERROR);
    }
}

module.exports = { getValidOrderRequest }