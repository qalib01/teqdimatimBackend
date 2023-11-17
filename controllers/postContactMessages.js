const db = require('../models/index');

let postContactMessages = async (req, res) => {
    let inputData = req.body;
    try {
        await db.contact_messages.create({
            name: inputData.name,
            email: inputData.email,
            subject: inputData.subject,
            message: inputData.message,
        });

        res.status(200).json({
            key: 'success',
            message: 'Mesajınız uğurla göndərildi. Müraciətiniz tezliklə cavablandırılacaqdır. Anlayışınız üçün təşəkkür edirik!'
        });
    } catch (error) {
        res.status(500).json({
            key: 'error',
            message: 'Mesajınızın göndərilməsi zamanı gözlənilməz xəta baş verdi. Xahiş olunur ki, daha sonra yenidən cəhd edəsiniz!'
        });
    }
}

module.exports = { postContactMessages };