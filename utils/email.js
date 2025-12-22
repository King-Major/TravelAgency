const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const typeLabels = {
  'flight': 'Flight Inquiry',
  'hotel': 'Hotel Request',
  'tour': 'Tour Package Inquiry',
  'visa': 'Visa Consultation',
  'custom-trip': 'Custom Trip Request',
  'general': 'General Inquiry'
};

const sendAdminEmail = async (inquiry) => {
  const subject = `NEW ${typeLabels[inquiry.inquiryType]} - ${inquiry.name}`;

  const html = `
    <h2>${subject}</h2>
    <p><strong>Customer:</strong> ${inquiry.name}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    <p><strong>Phone:</strong> ${inquiry.phone}</p>
    <strong>Type:</strong> ${typeLabels[inquiry.inquiryType]}</p>
    <hr>
    <pre>${JSON.stringify(inquiry.toObject(), null, 2)}</pre>
    <p>Time: ${new Date().toLocaleString('en-GB')}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject,
    html
  });
};

const sendAutoReply = async (inquiry) => {
  await transporter.sendMail({
    from: process.env.AUTO_REPLY_FROM || process.env.EMAIL_USER,
    to: inquiry.email,
    subject: "Thank you – We’ve received your travel request!",
    html: `
      <h3>Dear ${inquiry.name},</h3>
      <p>Thank you for contacting us regarding your <strong>${typeLabels[inquiry.inquiryType].toLowerCase()}</strong>.</p>
      <p>One of our travel experts will review your request and get back to you within 24 hours with the best available options.</p>
      <p>Warm regards,<br><strong>Your Travel Agency Team</strong></p>
    `
  });
};

module.exports = { sendAdminEmail, sendAutoReply };