const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_KEY,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  await transport.sendMail({
    from: `Kibun ${process.env.OWNER_MAIL}`,
    to,
    subject,
    html
  });
};

module.exports = sendEmail;
