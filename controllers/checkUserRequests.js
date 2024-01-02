const db = require('../models/index');
require('dotenv').config();
const nodeMailer = require('nodemailer');
const CryptoJS = require('crypto-js');
let { errorMessages } = require('../customMessages/errorMessages');
let { successMessages } = require('../customMessages/successMessages');

let checkUserDiscountRequests = async (req, res) => {
    const checkHasOrder = async (email) => {
        let orders = await db.orders.findAll({
            where: {
                email,
            }
        });
        return orders;
    }

    const checkDiscountPercent = (orders) => {
        let orderQuantity = orders.length;
        let discountPercent = 0;

        if (orderQuantity < 3) {
            discountPercent = 5;
        } else if (orderQuantity < 5) {
            discountPercent = 7;
        } else if (orderQuantity < 9) {
            discountPercent = 10;
        } else if (orderQuantity < 15) {
            discountPercent = 12;
        } else if (orderQuantity < 25) {
            discountPercent = 15;
        } else {
            discountPercent = 20;
        }
        return discountPercent;
    }

    const generateSecureToken = (token) => {
        // const hash = crypto.createHash('sha256').update(token).digest('hex'); // SHA-256 example
        // return hash;
        let encryptedSlug = CryptoJS.AES.encrypt(token, process.env.CRYPTO_SECRET_KEY).toString();
        return encryptedSlug;
    }

    const sendEmail = async (name, email, invitedEmail, discountPercent, option) => {
        const guidGenerate = () => {
            return 'xxxxxxxx-yxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                function (c) {
                    var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
                    return uuid.toString(16).toUpperCase();
                });
        }

        let emailId = guidGenerate();

        await db.email_logs.create({
            id: emailId,
            email_type: option,
            email_source: 'check_discount',
            email_to: undefined,
            ip_adress: await req.connection.remoteAddress,
            email_content: undefined,
            email_status: 'pending',
        });
        
        let mailSubject;
        let mailContent;
        let mailAdress;
        

        try {
            if (option === 'ilk_sifaris') {
                let link = generateSecureToken(emailId);
                // console.log(`https://www.teqdimatim.az/order/${encodeURIComponent(link)}`);
                // console.log('encodeURI-Link', encodeURI(link));
                // console.log('encodeURIComponent-Link', encodeURIComponent(link));
                // console.log('decodeURIComponent-Link', decodeURIComponent(link));
                // let testUrl = CryptoJS.AES.decrypt(link, process.env.CRYPTO_SECRET_KEY);
                // console.log('testUrl', testUrl);
                // let originalSlug = testUrl.toString(CryptoJS.enc.Utf8);
                // console.log('originalSlug', originalSlug);
                mailSubject = `Sorğulanmış məlumatların nəticəsi barədə detallı məlumat`;
                mailContent = `Hörmətli ${name}. Sorğunuz tesdiqlendi. Asagidaki linke daxil olaraq endirimi istifade ede bilersiniz! Endiriminiz: ${discountPercent}% Link: www.teqdimatim.az/order/${encodeURIComponent(link)}`;
                mailAdress = email;
            } else if (option === 'dostu_devet') {
                mailSubject = `${name} adlı istifadəçidən dəvət`;
                mailContent = `${name} sizə təqdimatım.az platformasından təqdimat sifariş etmək və almaq üçün təklif göndərdi. Asagidaki linke daxil olaraq endirimi istifade ede bilersiniz!`;
                mailAdress = invitedEmail;
            } else if (option === 'novbeti_sifaris') {
                mailSubject = `Endirim sizi gözləyir!`;
                mailContent = `Hörmətli, ${name}. Sizin üçün təyin olunmuş endirim ${discountPercent}%'dir. Endirimdən faydalanmaq üçün aşağıdakı linkə keçid edə bilərsiniz. Endirimlərin hesablanma qaydasıyla tanış olmaq üçün https://teqdimatim.az/faqs səhifəsini ziyarət edə bilərsiniz!`;
                mailAdress = email;
            } else {
                return false;
            }

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
                to: mailAdress, // list of receiver
                subject: mailSubject, // Subject
                html: mailContent, // html body
            });

            await db.email_logs.update({
                email_to: mailAdress,
                email_content: mailContent,
                email_status: 'success',
            },
            {
                where: {
                    id: emailId, 
                }
            });

            await db.order_requests.create({
                id: emailId,
                name,
                email,
                discountPercent,
                customer_status: 'sending'
            })

            return true;
        } catch (error) {
            await db.email_logs.update({
                email_to: mailAdress,
                email_content: mailContent,
                email_status: 'error',
            },
            {
                where: {
                    id: emailId, 
                }
            });

            console.log(error);
            return false;
        }
    }

    try {
        let { name, email, invitedEmail, option } = req.query;

        let hasAlreadyRequest = await db.email_logs.findOne({
            where: {
                email_to: email,
                email_type: option,
            },
            order: [
                [ 'updatedAt', 'DESC' ],
            ]
        });

        let checkDayRequest = true;
        let checkEmailStatus = true;
        if (hasAlreadyRequest) {
            const createdUserRequestDate = new Date(hasAlreadyRequest.updatedAt);
            const currentDate = new Date();
            checkDayRequest = currentDate.getTime() - createdUserRequestDate.getTime() > 24 * 60 * 60 * 1000;
            checkEmailStatus = hasAlreadyRequest.email_status !== 'success';
        }

        if (checkEmailStatus || checkDayRequest) {
            let orders = await checkHasOrder(email);
            let hasOrder = orders.length > 0;

            if (option === 'ilk_sifaris') {
                switch (hasOrder) {
                    case true:
                        res.status(409).json( errorMessages.DISCOUNT_ILK_SIFARIS_CONFLICT );
                        break;
                    default:
                        let discountPercent = 30;
                        let emailRes = await sendEmail(name, email, '', discountPercent, option);
                        switch (emailRes) {
                            case true:
                                res.status(200).json( successMessages.DISCOUNT_ILK_SIFARIS );
                                break;
                            default:
                                res.status(500).json( errorMessages.DISCOUNT_EMAIL_SEND );
                                break;
                        }
                        break;
                }
            } else if (option === 'dostu_devet') {
                switch (hasOrder) {
                    case true:
                        let hasOrder = await checkHasOrder(invitedEmail);
                        switch (hasOrder.length > 0) {
                            case true:
                                res.status(409).json( errorMessages.DISCOUNT_DOSTU_DEVET_CONFLICT );
                                break;
                            default:
                                let discountPercent = 30;
                                let emailRes = await sendEmail(name, '', invitedEmail, discountPercent, option);
                                switch (emailRes) {
                                    case true:
                                        res.status(200).json( successMessages.DISCOUNT_DOSTU_DEVET );
                                        break;
                                    default:
                                        res.status(500).json( errorMessages.DISCOUNT_EMAIL_SEND );
                                        break;
                                }
                                break;
                        }
                        break;
                    default:
                        res.status(403).json( errorMessages.DISCOUNT_NOT_ORDERS_YET );
                        break;
                }
            } else if (option === 'novbeti_sifaris') {
                switch (hasOrder) {
                    case true:
                        let discountPercent = checkDiscountPercent(orders);
                        let emailRes = await sendEmail(name, email, '', discountPercent, option);
                        switch (emailRes) {
                            case true:
                                res.status(200).json( successMessages.DISCOUNT_NOVBETI_SIFARIS );
                                break;
                            default:
                                res.status(500).json( errorMessages.DISCOUNT_EMAIL_SEND );
                                break;
                        }
                        break;
                    default:
                        res.status(403).json( errorMessages.DISCOUNT_NOT_ORDERS_YET );
                        break;
                }
            } else {
                res.status(404).json( errorMessages.DISCOUNT_NOT_TRUE_OPTION );
            }
        } else {
            res.status(409).json( errorMessages.EMAIL_DAILY_LIMIT );
        }
    } catch (error) {
        console.error('Error in /check_user_request route:', error);
        res.status(500).json( errorMessages.GENERAL_SERVER_ERROR );
    }
}

module.exports = { checkUserDiscountRequests };