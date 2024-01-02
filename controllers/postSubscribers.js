const db = require('../models/index');
const { errorMessages } = require('../customMessages/errorMessages');
const { successMessages } = require('../customMessages/successMessages');

let postSubscribers = async (req, res) => {
    let inputData = req.body;
    try {
        let hasUser = await db.subscribers.findOne({
            where: {
                email: inputData.email,
            }
        })
        
        if (hasUser) {
            res.status(409).json( errorMessages.SUBSCRIPTION_EMAIL_CONFLICT );
        } else {
            await db.subscribers.create({
                email: inputData.email,
            });

            res.status(200).json( successMessages.SUBSCRIPTION_COMPLETED );
        }
    } catch (error) {
        res.status(500).json( errorMessages.GENERAL_SERVER_ERROR );
    }
}

module.exports = { postSubscribers };