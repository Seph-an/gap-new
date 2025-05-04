// lib/SendMail.js

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail({ sender, receiver, subject, html }) {
  const msg = {
    to: receiver,
    from: sender,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email sent to ${receiver}`);
    return { success: true };
  } catch (error) {
    console.error(
      "❌ Email sending failed:",
      error.response?.body || error.message
    );
    return { success: false, error: error.message };
  }
}
