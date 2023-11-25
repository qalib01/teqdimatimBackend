const db = require('../models/index');
let { errorMessages } = require('../customMessages/errorMessages');
let { successMessages } = require('../customMessages/successMessages');

let postContactMessages = async (req, res) => {
    let inputData = req.body;

    try {
        let hasAlreadyRequest = await db.contact_messages.findOne({
            where: {
                email: req.body.email,
            },
            order: [
                [ 'createdAt', 'DESC' ],
            ]
        });

        let checkDayRequest = true;
        if (hasAlreadyRequest) {
            const createdUserRequestDate = new Date(hasAlreadyRequest.updatedAt);
            const currentDate = new Date();
            checkDayRequest = currentDate.getTime() - createdUserRequestDate.getTime() > 24 * 60 * 60 * 1000;
        }

        if (checkDayRequest) {
            await db.contact_messages.create({
                name: inputData.name,
                email: inputData.email,
                subject: inputData.subject,
                message: inputData.message,
            });
    
            res.status(200).json( successMessages.CONTACT_MESSAGE_SEND );
        } else {
            res.status(409).json( errorMessages.EMAIL_DAILY_LIMIT );
        }
        
    } catch (error) {
        res.status(500).json( errorMessages.CONTACT_MESSAGE_NOT_SEND );
    }
}

module.exports = { postContactMessages };