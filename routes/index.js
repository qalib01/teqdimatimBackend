let express = require('express');
let router = express.Router();
let db = require('../models/index.js');
require('dotenv').config();
let nodeMailer = require('nodemailer');

/* GET faqs data. */
router.get('/faqs', async (req, res, next) => {
  try {
    const faq_groups = await db.faq_groups.findAll({
      where: {
        status: true,
      },
      include: {
        model: db.faqs,
        as: 'faqs',
        where: {
          status: true,
        },
        // required: true, // Ensure all associated faqs have status: true
      },
    });

    if (!faq_groups || faq_groups.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(faq_groups);
  } catch (error) {
    console.error('Error in /faqs route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET products data. */
router.get('/products', async (req, res, next) => {
  try {
    const products = await db.products.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: db.product_categories,
          as: 'categories',
        },
        {
          model: db.product_formats,
          as: 'formats',
        },
        {
          model: db.product_languages,
          as: 'languages',
        },
        {
          model: db.product_sizes,
          as: 'sizes',
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error in /products route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET categories data. */
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await db.product_categories.findAll({
      where: {
        status: true,
      },
      order: [
        ['createdAt', 'ASC']
      ]
    });

    if (!categories || categories.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(categories);
  } catch (error) {
    console.error('Error in /categories route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET product data by id. */
router.get('/product/find_by_id', async (req, res, next) => {
  try {
    let id = req.query.id;
    const product = await db.products.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.product_categories,
          as: 'categories',
        },
        {
          model: db.product_formats,
          as: 'formats',
        },
        {
          model: db.product_languages,
          as: 'languages',
        },
        {
          model: db.product_sizes,
          as: 'sizes',
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error in /product route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET products data by category. */
router.get('/product/find_by_category', async (req, res, next) => {
  try {
    let id = req.query.id;
    const product = await db.products.findAll({
      include: [
        {
          model: db.product_categories,
          as: 'categories',
          where: {
            id
          }
        },
        {
          model: db.product_formats,
          as: 'formats',
        },
        {
          model: db.product_languages,
          as: 'languages',
        },
        {
          model: db.product_sizes,
          as: 'sizes',
        }
      ],
      order: [
        ['createdAt', 'ASC']
      ]
    });

    if (!product) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error in /product route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET carousels data. */
router.get('/carousels', async (req, res, next) => {
  try {
    const carousels = await db.carousels.findAll({
      where: {
        status: true,
      },
      order: [
        ['createdAt', 'ASC']
      ]
    });

    if (!carousels || carousels.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(carousels);
  } catch (error) {
    console.error('Error in /carousels route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET team_members data. */
router.get('/team_members', async (req, res, next) => {
  try {
    const team_members = await db.team_members.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: db.team_member_social_medias,
          as: 'social_medias',
        }
      ],
    });

    if (!team_members || team_members.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(team_members);
  } catch (error) {
    console.error('Error in /team_members route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* GET testimonials data. */
router.get('/testimonials', async (req, res, next) => {
  try {
    const testimonials = await db.testimonials.findAll({
      where: {
        status: true,
      },
    });

    if (!testimonials || testimonials.length === 0) {
      return res.status(404).json({ error: 'Not found!' });
    }

    res.json(testimonials);
  } catch (error) {
    console.error('Error in /testimonials route:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});

/* POST contact data. */
router.post('/contact', async (req, res, next) => {
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
});

/* GET check_user_request data. */
router.get('/check_user_request', async (req, res, next) => {
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

  const sendEmail = async (name, email, invitedEmail, discountPercent, option) => {
    try {
      let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        logger: true,
        transactionLog: true, // include SMTP traffic in the logs
        auth: {
          user: process.env.INFO_MAIL_ADRESS, // generated ethereal user
          pass: process.env.INFO_MAIL_PASS, // generated ethereal password
        },
      });

      let mailSubject;
      let mailContent;
      let mailAdress;

      if (option === 'ilk_sifaris') {
        mailSubject = `Sorğulanmış məlumatların nəticəsi barədə detallı məlumat`;
        mailContent = `Hörtməli ${ name }. Sorğunuz tesdiqlendi. Asagidaki linke daxil olaraq endirimi istifade ede bilersiniz!`;
        mailAdress = email;
      } else if (option === 'dostu_devet') {
        mailSubject = `${ name } adlı istifadəçidən dəvət`;
        mailContent = `${ name }  sizə təqdimatım.az platformasından təqdimat sifariş etmək və almaq üçün təklif göndərdi. Asagidaki linke daxil olaraq endirimi istifade ede bilersiniz!`;
        mailAdress = invitedEmail;
      } else if (option === 'novbeti_sifaris') {
          mailSubject = `Endirim sizi gözləyir!`;
          mailContent = `Hörmətli, ${ name }. Sizin üçün təyin olunmuş endirim ${ discountPercent }'dir. Endirimdən faydalanmaq üçün aşağıdakı linkə keçid edə bilərsiniz. Endirimlərin hesablanma qaydasıyla tanış olmaq üçün https://teqdimatim.az/faqs səhifəsini ziyarət edə bilərsiniz!`;
          mailAdress = email;
      } else {
        mailSubject = null;
        mailContent = null;
        mailAdress = null;
      }

      

      await transporter.sendMail({
        from: `Təqdimat Məlumat Sistemi ${ process.env.INFO_MAIL_ADRESS }`, // sender address
        to: mailAdress, // list of receiver
        subject: mailSubject, // Subject
        html: mailContent, // html body
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  try {
    let { name, email, invitedEmail, option } = req.query;
    let orders = await checkHasOrder(email);
    let hasOrder = orders.length > 0;

    if (option === 'ilk_sifaris') {
      switch (hasOrder) {
        case true:
          res.status(409).json({
            key: 'error',
            message: 'Sizin daha öncədən sifarişiniz olduğu üçün 30% endirimdən yararlana bilmirsiniz. Digər seçimləri yoxlamağınızı xahiş edirik!'
          });
          break;
        default:
          let emailRes = await sendEmail(name, email, '', '', option);
          switch (emailRes) {
            case true:
              res.status(200).json({
                key: 'success',
                message: 'Daha öncədən sifarişiniz olmadığı üçün siz 30% endirimdən yararlana bilərsiniz. Ətraflı məlumat email hesabınıza göndərildi!'
              });
              break;
            default:
              res.status(500).json({
                key: 'error',
                message: `Emailin göndərilməsi zamanı gözlənilməz xəta baş verdi. Xahiş olunur ki, daha sonra yenidən cəhd edəsiniz!`
              });
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
              res.status(409).json({
                key: 'error',
                message: 'Dəvət etmək istədiyiniz dostunuz bizdən daha öncədən sifariş verməməlidir. Xahiş olunur ki, başqa dostunuzu yoxlayasınız!'
              });
              break;
            default:
              let emailRes = await sendEmail(name, '', invitedEmail, '', option);
              switch (emailRes) {
                case true:
                  res.status(200).json({
                    key: 'success',
                    message: 'Dostunuzu dəvət etdiyiniz üçün təşəkkür edirik. Dəvət emaili dostunuza artıq göndərildi!'
                  });
                  break;
                default:
                  res.status(500).json({
                    key: 'error',
                    message: `Emailin göndərilməsi zamanı gözlənilməz xəta baş verdi. Xahiş olunur ki, daha sonra yenidən cəhd edəsiniz!`
                  });
                  break;
              }
              break;
          }
          break;
        default:
          res.status(403).json({
            key: 'error',
            message: 'Sizin daha öncədən sifarişiniz olmadığı üçün bunu edə bilməzsiniz. Xahiş olunur ki, "İlk sifariş" seçimiylə davam edəsiniz!'
          });
          break;
      }
    } else if (option === 'novbeti_sifaris') {
      switch (hasOrder) {
        case true:
          let discountPercent = checkDiscountPercent(orders);
          let emailRes = await sendEmail(name, email, '', discountPercent, option);
          switch (emailRes) {
            case true:
              res.status(200).json({
                key: 'success',
                message: `Öncəki sifarişlərinizi nəzərə alaraq sizə növbəti ilk sifarişinizdə ${ discountPercent }% endirim təklif edirik. Ətraflı məlumat email hesabınıza göndərildi!`
              });
              break;
            default:
              res.status(500).json({
                key: 'error',
                message: `Emailin göndərilməsi zamanı gözlənilməz xəta baş verdi. Xahiş olunur ki, daha sonra yenidən cəhd edəsiniz!`
              });
              break;
          }
          break;
        default:
          res.status(403).json({
            key: 'error',
            message: 'Sizin daha öncədən sifarişiniz olmadığı üçün bunu edə bilməzsiniz. Xahiş olunur ki, "İlk sifariş" seçimiylə davam edəsiniz!'
          });
          break;
      }
    } else {
      res.status(404).json({
        key: 'error',
        message: 'Düzgün seçim etmədiniz. Xahiş olunur ki, seçiminizi yenidən edəsiniz!'
      });
    }
  } catch (error) {
    console.error('Error in /check_user_request route:', error);
    res.status(500).json({
      key: 'error',
      message: 'Məlumatların yoxlanılması zamanı gözlənilməz xəta baş verdi. Xahiş olunur ki, daha sonra yenidən cəhd edəsiniz!'
    });
  }
});

module.exports = router;