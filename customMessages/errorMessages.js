let key = 'error';
var errorMessages = {
    DISCOUNT_ILK_SIFARIS_CONFLICT: {
        key,
        message: 'Sizin daha öncədən sifarişiniz olduğu üçün 30% endirimdən yararlana bilmirsiniz. Digər seçimləri yoxlamağınızı xahiş edirik!',
    },
    DISCOUNT_EMAIL_SEND: {
        key,
        message: 'Emailin göndərilməsi zamanı gözlənilməz xəta baş verdi. Xahiş olunur ki, daha sonra yenidən cəhd edəsiniz!'
    },
    DISCOUNT_DOSTU_DEVET_CONFLICT: {
        key,
        message: 'Dəvət etmək istədiyiniz dostunuz bizdən daha öncədən sifariş verməməlidir. Xahiş olunur ki, başqa dostunuzu yoxlayasınız!'
    },
    DISCOUNT_NOT_ORDERS_YET: {
        key,
        message: 'Sizin daha öncədən sifarişiniz olmadığı üçün bunu edə bilməzsiniz. Xahiş olunur ki, "İlk sifariş" seçimiylə davam edəsiniz!'
    },
    DISCOUNT_NOT_TRUE_OPTION: {
        key,
        message: 'Düzgün seçim etmədiniz. Xahiş olunur ki, seçiminizi yenidən edəsiniz!'
    },
    // DISCOUNT_SERVER_ERROR: {
    //     key,
    //     message: 'Məlumatların yoxlanılması zamanı gözlənilməz xəta baş verdi. Xahiş olunur ki, daha sonra yenidən cəhd edəsiniz!'
    // },
    EMAIL_DAILY_LIMIT: {
        key,
        message: 'Siz artıq bir dəfə müraciət etmisiniz. Növbəti müraciətinizi 24 saat tamam olduqdan sonra edə bilərsiniz!'
    },

    USER_HAVE_ACTIVE_REQUEST: {
        key,
        message: 'Sizin artıq aktiv müraicətiniz mövcuddur. Cari müraciət bitməmiş yeni müraciət aça bilməzsiniz!'
    },

    CONTACT_MESSAGE_NOT_SEND: {
        key,
        message: 'Mesajınızın göndərilməsi zamanı gözlənilməz xəta baş verdi. Xahiş olunur ki, daha sonra yenidən cəhd edəsiniz!'
    },

    SUBSCRIPTION_EMAIL_CONFLICT: {
        key,
        message: 'Qeyd olunan emaildə abunəçimiz artıq mövcuddur. Xahiş olunur ki, başqa email adresi yoxlayasınız!'
    },
    // SUBSCRIPTION_SERVER_ERROR: {
    //     key,
    //     message: 'Abunəliyinizin yoxlanılması zamanı gözlənilməz xəta baş verdi. Xahiş olunur ki, daha sonra yenidən cəhd edəsiniz!'
    // },

    ORDER_ALREADY_HAS: {
        key,
        message: 'Bu linkə uyğun atıq sifariş mövcuddur! Bunun bir xəta olduğunu düşünürsünüzsə, xahiş olunur ki, bizimlə əlaqə saxlayasınız!'
    },

    REQUEST_NOT_FOUND: {
        key,
        message: 'Hər hansı bir müraciət tapılmadı. Xahiş olunur ki, linki yenidən yoxlayıb davam edəsiniz. Problem davam edərsə, bizimlə əlaqə saxlamağınızı xahiş edirik!'
    },

    GENERAL_SERVER_ERROR: {
        key,
        message: 'Məlumatların yoxlanılması zamanı gözlənilməz xəta baş verdi. Xahiş olunur ki, daha sonra yenidən cəhd edəsiniz!'
    },
}

module.exports = { errorMessages };