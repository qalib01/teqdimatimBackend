const db = require('../models/index');
const { sequelize } = require('../models/index');
require('dotenv').config();
const nodeMailer = require('nodemailer');
const CryptoJS = require('crypto-js');
let { errorMessages } = require('../customMessages/errorMessages');
let { successMessages } = require('../customMessages/successMessages');

let checkUserDiscountRequests = async (req, res) => {
    const getData = async (email) => {
        let data = await db.customers.findOne({
            include: [
                {
                    model: sequelize.model('custom_orders'),
                    as: 'custom_orders'
                },
                {
                    model: sequelize.model('product_orders'),
                    as: 'product_orders',
                },
                {
                    model: sequelize.model('customer_discounts'),
                    as: 'discounts',
                    include: [
                        {
                            model: sequelize.model('discounts'),
                            as: 'discount'
                        }
                    ],
                },
            ],
            where: {
                email,
            },
        });
        return data;
    }

    const checkIsCustomer = async (data) => {
        return (data && (data.custom_orders.length > 0 || data.product_orders.length > 0)) ? true : false;
    }

    const checkDailyCustomerRequest = async (email) => {
        let hasAlreadyRequest = await db.email_logs.findOne({
            where: {
                email_to: email,
                email_source: 'check_discount',
            },
            order: [
                ['updatedAt', 'DESC'],
            ]
        });

        let checkDayRequest = true;
        let checkEmailStatus = true;
        if (hasAlreadyRequest !== null ? true : false) {
            const createdUserRequestDate = new Date(hasAlreadyRequest.updatedAt);
            const currentDate = new Date();
            checkDayRequest = currentDate.getTime() - createdUserRequestDate.getTime() > 24 * 60 * 60 * 1000;
            checkEmailStatus = hasAlreadyRequest.email_status !== 'success';
        }

        return checkDayRequest || checkEmailStatus;
    }

    const checkActiveRequest = async (data) => {
        return (data && ((data.custom_orders && data.custom_orders.some(order => order.status !== 'finished')) || (data.product_orders && data.product_orders.some(order => order.status !== 'finished')))) ? true  : false;
    }

    const calculateDiscountPercent = (quantity) => {
        let percent = 0;

        if (quantity < 3) {
            percent = 5;
        } else if (quantity < 5) {
            percent = 7;
        } else if (quantity < 9) {
            percent = 10;
        } else if (quantity < 15) {
            percent = 12;
        } else if (quantity < 25) {
            percent = 15;
        } else {
            percent = 20;
        }
        return percent;
    }

    const generateSecureToken = (token) => {
        let encryptedSlug = CryptoJS.AES.encrypt(token, process.env.CRYPTO_SECRET_KEY).toString();
        return encryptedSlug;
    }

    const getDiscountInformation = async (key, percent) => {
        let discount = await db.discounts.findOne({
            where: {
                key,
            }
        });
        if (key === 'novbeti_sifaris') {
            discount.percent = percent;
        }
        return discount;
    }

    const sendEmail = async (name, email, invitedEmail, discount) => {
        const guidGenerate = () => {
            return 'xxxxxxxx-yxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                function (c) {
                    var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
                    return uuid.toString(16).toUpperCase();
                });
        }
        let id = guidGenerate();
        let customer = await getData(discount.key === 'dostu_devet' ? invitedEmail : email);
        let customerId = customer != null ? customer.id : guidGenerate();
        let requestId = guidGenerate();
        let linkSlug = `/customer_id=${customerId}/request_id=${requestId}`;

        let emailAdress;
        let emailSubject;
        let emailContent;
        let slug = generateSecureToken(linkSlug);

        try {
            if (discount.key === 'ilk_sifaris') {
                emailAdress = email;
                emailSubject = `Sorğulanmış məlumatların nəticəsi barədə detallı məlumat`;
                emailContent = `Hörmətli ${name}. Sorğunuz tesdiqlendi. Asagidaki linke daxil olaraq endirimi istifade ede bilersiniz! Endiriminiz: ${discount.percent}% Link: www.teqdimatim.az/order/${encodeURIComponent(slug)}`;
            } else if (discount.key === 'dostu_devet') {
                emailAdress = invitedEmail;
                emailSubject = `${name} adlı istifadəçidən dəvət`;
                emailContent = `${name} sizə təqdimatım.az platformasından təqdimat sifariş etmək və almaq üçün sizə endirimli təklif göndərdi. Endiriminiz: ${discount.percent}% Asagidaki linke daxil olaraq endirimi istifade ede bilersiniz!`;
            } else if (discount.key === 'novbeti_sifaris') {
                emailAdress = email;
                emailSubject = `Endirim sizi gözləyir!`;
                emailContent = `Hörmətli, ${name}. Sizin üçün təyin olunmuş endirim ${discount.percent}%'dir. Endirimdən faydalanmaq üçün aşağıdakı linkə keçid edə bilərsiniz. Link: www.teqdimatim.az/order/${encodeURIComponent(slug)} Endirimlərin hesablanma qaydasıyla tanış olmaq üçün https://teqdimatim.az/faqs səhifəsini ziyarət edə bilərsiniz!`;
            } else {
                return false;
            }

            await db.email_logs.create({ // Creating email logs
                id,
                email_type: discount.key,
                email_source: 'check_discount',
                email_to: emailAdress,
                ipv4_adress: await req.connection.remoteAddress,
                email_subject: emailSubject,
                email_content: emailContent,
                email_status: 'pending',
            });

            let transporter = nodeMailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                requireTLS: true,
                logger: true,
                debug: true,
                transactionLog: true, // include SMTP traffic in the logs
                auth: {
                    user: process.env.INFO_MAIL_ADRESS, // generated ethereal user
                    pass: process.env.INFO_MAIL_PASS, // generated ethereal password
                },
            });
            await transporter.sendMail({
                from: `Təqdimat Məlumat Sistemi ${process.env.INFO_MAIL_ADRESS}`, // sender address
                to: emailAdress, // list of receiver
                subject: emailSubject, // Subject
                html: emailContent, // html body
            });

            await db.email_logs.update({ // Update current email logs
                email_status: 'success',
            },
            {
                where: {
                    id,
                }
            });

            if (!checkIsCustomer) {
                await db.customers.create({ // Creating new customer
                    id: customerId,
                    name,
                    email,
                    status: 'requested'
                });
            }

            await db.customer_discounts.create({ // Creating new customer
                customer_id: customerId,
                discount_key: discount.key,
                status: false
            });

            return true;
        } catch (error) {
            await db.email_logs.update({
                email_to: emailAdress,
                email_content: emailContent,
                email_status: 'error',
            },
                {
                    where: {
                        id: id,
                    }
                });

            console.log(error);
            return false;
        }
    }

    try {
        let { name, email, invitedEmail, discount_key } = req.query;
        let isSendAvaliable = await checkDailyCustomerRequest(email);

        if (isSendAvaliable) {
            let allData = await getData(email);
            let isCustomer =  await checkIsCustomer(allData);

            if (discount_key === 'ilk_sifaris') {
                switch (isCustomer) {
                    case false:
                        let discount = await getDiscountInformation(discount_key);
                        let emailRes = await sendEmail(name, email, '', discount);
                        switch (emailRes) {
                            case true:
                                res.status(200).json(successMessages.DISCOUNT_ILK_SIFARIS);
                                break;
                            default:
                                res.status(500).json(errorMessages.DISCOUNT_EMAIL_SEND);
                                break;
                        }
                        break;
                    default:
                        res.status(409).json(errorMessages.DISCOUNT_ILK_SIFARIS_CONFLICT);
                        break;
                }
            } else if (discount_key === 'dostu_devet') {
                switch (isCustomer) {
                    case true:
                        let isCustomer = await checkIsCustomer(invitedEmail);
                        switch (isCustomer) {
                            case true:
                                let discount = await getDiscountInformation(discount_key);
                                let emailRes = await sendEmail(name, '', invitedEmail, discount);
                                switch (emailRes) {
                                    case true:
                                        res.status(200).json(successMessages.DISCOUNT_DOSTU_DEVET);
                                        break;
                                    default:
                                        res.status(500).json(errorMessages.DISCOUNT_EMAIL_SEND);
                                        break;
                                }
                                break;
                            default:
                                res.status(409).json(errorMessages.DISCOUNT_DOSTU_DEVET_CONFLICT);
                                break;
                        }
                        break;
                    default:
                        res.status(403).json(errorMessages.DISCOUNT_NOT_ORDERS_YET);
                        break;
                }
            } else if (discount_key === 'novbeti_sifaris') {
                switch (isCustomer) {
                    case true:
                        let hasActiveRequest = await checkActiveRequest(allData);
                        switch (hasActiveRequest) {
                            case false:
                                let percent = calculateDiscountPercent(allData ? allData.product_orders.length + allData.custom_orders.length : 0);
                                let discount = await getDiscountInformation(discount_key, percent);
                                let emailRes = await sendEmail(name, email, '', discount);
                                switch (emailRes) {
                                    case true:
                                        res.status(200).json(successMessages.DISCOUNT_NOVBETI_SIFARIS);
                                        break;
                                    default:
                                        res.status(500).json(errorMessages.DISCOUNT_EMAIL_SEND);
                                        break;
                                }
                                break;
                            default:
                                res.status(409).json(errorMessages.USER_HAVE_ACTIVE_REQUEST);
                                break;
                        }
                        break;
                    default:
                        res.status(403).json(errorMessages.DISCOUNT_NOT_ORDERS_YET);
                        break;
                }
            } else {
                res.status(404).json(errorMessages.DISCOUNT_NOT_TRUE_OPTION);
            }
        } else {
            res.status(409).json(errorMessages.EMAIL_DAILY_LIMIT);
        }

    } catch (error) {
        console.error('Error in /check_user_request route:', error);
        res.status(500).json(errorMessages.GENERAL_SERVER_ERROR);
    }
}

module.exports = { checkUserDiscountRequests };