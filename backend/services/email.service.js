const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : Number(process.env.BREVO_PORT) === 465,
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_KEY,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendEmail = async ({ to, subject, html }) => {
  if (process.env.SKIP_EMAIL === "true") {
    console.log(`[Mock Email] To: ${to}, Subject: ${subject}`);
    console.log(`[Mock Email Content]: ${html}`);
    return;
  }
  try {
    await transport.sendMail({
      from: `Kibun <${process.env.OWNER_MAIL}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;
