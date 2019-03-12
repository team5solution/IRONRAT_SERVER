var nodemailer = require("nodemailer");

module.exports = function(email_address, subject, content) {
   var smtpTransporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "ironratcustoms@zoho.com",
      pass: "RmMUyEHtjz2HBV:"
    }
  });

  var mailOptions = {
    from: "Sixian Lin <ironratcustoms@zoho.com>",
    to: email_address,
    subject: subject,
    text: content
  };
  return new Promise((resolve, reject) => {
    smtpTransporter.sendMail(mailOptions, (err, success) => {
      if (err) reject(Error(err));
      if (success) {
        resolve("send mail successfully");
      }
    });
  });
};
