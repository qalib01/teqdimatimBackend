const db = require('../models/index');

let postSubscribers = async (req, res) => {
    let inputData = req.body;
    try {
        let hasUser = await db.subscribers.findOne({
            where: {
                email: inputData.email,
            }
        })
        
        if (hasUser) {
            res.status(409).json({
                key: 'error',
                message: 'Qeyd olunan emaildə abunəçimiz artıq mövcuddur. Xahiş olunur ki, başqa email adresi yoxlayasınız!'
            });
        } else {
            await db.subscribers.create({
                email: inputData.email,
            });

            res.status(200).json({
                key: 'success',
                message: 'Abunəliyiniz uğurla tamamlandı. Artıq xəbərlər, endirimlər, yeniliklərlə bağlı məlumatları tez bir zamanda əldə edəcəksiniz!'
            });
        }
    } catch (error) {
        res.status(500).json({
            key: 'error',
            message: 'Abunəliyinizin yoxlanılması zamanı gözlənilməz xəta baş verdi. Xahiş olunur ki, daha sonra yenidən cəhd edəsiniz!'
        });
    }
}

module.exports = { postSubscribers };