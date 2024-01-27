const db = require('../models/index');
require('dotenv').config();
const nodeMailer = require('nodemailer');
const CryptoJS = require('crypto-js');
const { errorMessages } = require('../customMessages/errorMessages');
const { successMessages } = require('../customMessages/successMessages');

const guidGenerate = () => {
  return 'xxxxxxxx-yxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function (c) {
      var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
      return uuid.toString(16).toUpperCase();
    });
}

let postSubscribers = async (req, res) => {
  let inputData = req.body;
  console.log(inputData);

  const generateSecureToken = (token) => {
    // const hash = crypto.createHash('sha256').update(token).digest('hex'); // SHA-256 example
    // return hash;
    let encryptedSlug = CryptoJS.AES.encrypt(token, process.env.CRYPTO_SECRET_KEY).toString();
    return encryptedSlug;
  }

  const sendEmail = async (email) => {
    let log_id = guidGenerate();
    let emailContent;
    let emailSubject;
    let encryptedEmail = generateSecureToken(email);

    try {
      emailContent = `
            <body
              style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;margin:0">
              <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#F7F7F7">
                <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none"
                  style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F7F7F7">
                  <tr style="border-collapse:collapse">
                    <td valign="top" style="padding:0;margin:0">
                      <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                        <tr style="border-collapse:collapse">
                          <td class="es-adaptive" align="center" style="padding:0;margin:0">
                            <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#3d5ca3;width:600px" cellspacing="0" cellpadding="0" bgcolor="#3d5ca3" align="center" role="none">
                              <tr style="border-collapse:collapse">
                                <td style="margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#3d5ca3;text-align:center;" bgcolor="#3d5ca3" align="left">
                                  <a href="https://teqdimatim.az" target="_blank"
                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#fff;font-size:24px;text-decoration:none;font-weight:bold;">
                                    TəqdimatımAz 
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr style="border-collapse:collapse">
                          <td align="center" style="padding:0;margin:0">
                            <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#fafafa;width:600px" cellspacing="0" cellpadding="0" bgcolor="#fafafa" align="center" role="none">
                              <tr style="border-collapse:collapse">
                                <td style="margin:0;padding:40px;background-repeat:no-repeat" align="left">
                                  <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;margin:0;width:560px">
                                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                          <tr style="border-collapse:collapse">
                                            <td align="center" style="padding:0;margin:0;padding-bottom:10px;padding-top:20px">
                                              <h1 style="margin:0;line-height:60px;mso-line-height-rule:exactly;font-family:lora, georgia, 'times new roman', serif;font-size:50px;font-style:normal;font-weight:normal;color:#333333">
                                                <em> Xoş gəldin </em>
                                              </h1>
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td align="center" style="padding:0;margin:0;padding-top:10px;padding-bottom:10px">
                                              <h4 style="margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333">
                                                Dəyərli abunəçi, Səni aramızda görməkdən məmnunuq! </h4>
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td align="center" style="padding:0;margin:0;padding-bottom:20px">
                                              <p style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">
                                                Yeniliklər, xəbərlər, endirimlər daha çoxu barədə bu elektron poçt ünvanına
                                                məlumatları göndərəcəyik. </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                        <tr style="border-collapse:collapse">
                          <td align="center" style="padding:0;margin:0">
                            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                              <tr style="border-collapse:collapse">
                                <td style="margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px;background-color:#f7c052" bgcolor="#f7c052" align="left">
                                  <table class="es-left" cellspacing="0" cellpadding="0" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                    <tr style="border-collapse:collapse">
                                      <td class="es-m-p20b" align="center" style="padding:0;margin:0;width:180px">
                                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                          <tr style="border-collapse:collapse">
                                            <td align="center" style="padding:0;margin:0;padding-bottom:5px;font-size:0">
                                              <i class="fa-regular fa-envelope"
                                                style="font-size: 24px; color: #fff; margin-bottom: 10px;"></i>
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td esdev-links-color="#ffffff" align="center" style="padding:0;margin:0">
                                              <p style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:27px;color:#ffffff;font-size:14px">
                                                <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#ffffff;font-size:18px" href="mailto:info@teqdimatim.az">info@teqdimatim.az</a>
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <table class="es-right" cellspacing="0" cellpadding="0" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                    <tr style="border-collapse:collapse">
                                      <td align="center" style="padding:0;margin:0;width:180px">
                                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                          <tr style="border-collapse:collapse">
                                            <td align="center" style="padding:0;margin:0;padding-bottom:5px;font-size:0">
                                              <i class="fa-solid fa-phone" style="font-size: 24px; color: #fff; margin-bottom: 10px;"></i>
                                            </td>
                                          </tr>
                                          <tr style="border-collapse:collapse">
                                            <td align="center" style="padding:0;margin:0">
                                              <p style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#ffffff;font-size:16px">
                                                <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#ffffff;font-size:16px" href="tel:+994507038481"> +994 (50) 703-8481 </a>
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                        <tr style="border-collapse:collapse">
                          <td align="center" style="padding:0;margin:0">
                            <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px;margin: 20px">
                              <tr style="border-collapse:collapse">
                                <td align="left" style="margin:0;padding-top:5px;padding-bottom:10px;padding-left:10px;padding-right:10px">
                                  <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                    <tr style="border-collapse:collapse">
                                      <td valign="top" align="center" style="padding:0;margin:0;width:580px">
                                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                          <tr style="border-collapse:collapse">
                                            <td align="center" style="padding:0;margin:0">
                                              <p style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#666666;font-size:13px">
                                                Bu məlumatlandırma emaili ${email} ünvanına göndərildi, çünki bu email
                                                daha əvvəl sistemimizdə abunəçi kimi qeydiyyatdan keçib.
                                              </p>
                                              <p style="margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#666666;font-size:13px">
                                                Əgər abunəliyinizi dayandırmaq istəyirsinizsə, <a target="_blank" class="unsubscribe" href="https://teqdimatim.az/unsubscribe?email=${encodeURIComponent(encryptedEmail)}" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:12px">linkinə</a>
                                                daxil olmağınızı xahiş edirik!</p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </body>
            `
      emailSubject = 'Uğurla abunə oldunuz!';

      await db.email_logs.create({
        id: log_id,
        email_type: 'subscribe',
        email_source: 'subscribe',
        email_to: email,
        ipv4_adress: await req.connection.remoteAddress,
        email_subject: emailSubject,
        email_content: 'Text',
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
        from: `Təqdimat Abunəlik Sistemi ${process.env.INFO_MAIL_ADRESS}`, // sender address
        to: email, // list of receiver
        subject: emailSubject, // Subject
        html: emailContent, // html body
      });

      await db.email_logs.update({
        email_status: 'success',
      },
        {
          where: {
            id: log_id,
          }
        });

      return true;
    } catch (error) {
      await db.email_logs.update({
        email_to: email,
        email_content: emailContent,
        email_status: 'error',
      },
        {
          where: {
            id: log_id,
          }
        });

      console.log(error);
      return false;
    }
  }



  try {
    let hasUser = await db.subscribers.findOne({
      where: {
        email: inputData.email,
      }
    })
    console.log(hasUser);

    if (hasUser) {
      res.status(409).json(errorMessages.SUBSCRIPTION_EMAIL_CONFLICT);
    } else {
      await sendEmail(inputData.email);
      await db.subscribers.create({
        id: guidGenerate(),
        email: inputData.email,
      });
      res.status(200).json(successMessages.SUBSCRIPTION_COMPLETED);
    }
  } catch (error) {
    res.status(500).json(errorMessages.GENERAL_SERVER_ERROR);
  }
}

const getEmail = (data) => {
  let cryptedSlug = decodeURIComponent(data);
  let slugBytes = CryptoJS.AES.decrypt(cryptedSlug, process.env.CRYPTO_SECRET_KEY);
  let email = slugBytes.toString(CryptoJS.enc.Utf8);
  return email;
}

let deleteSubscriber = async (req, res) => {
  let email = getEmail(req.query.email);

  try {
    let hasEmail = await db.subscribers.findOne({
      where: {
        email,
      }
    });
  
    if (hasEmail) {
      await db.subscribers.destroy({
        where: {
          email,
        },
      });
      res.status(200).json(successMessages.EMAIL_DELETED);
    } else {
      res.status(404).json(errorMessages.NOT_EMAIL_FOUND);
    }
  } catch (error) {
    res.status(500).json(errorMessages.GENERAL_SERVER_ERROR);
  }
}

module.exports = { postSubscribers, deleteSubscriber };