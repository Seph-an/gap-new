// lib/SendMail.js

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends an email using SendGrid
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.sender
 * @param {string} params.receiver
 * @param {string} params.subject
 * @param {string} params.text
 * @param {string} params.html
 */
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

/**
 * Sends an email using SendGrid
 * import { sendEmail } from "@/lib/sendEmail";

export async function POST(req) {
  const body = await req.json();
  const { name, email, message } = body;

  const subject = `New Inquiry from ${name}`;
  const html = `
    <h2>Hello Gap Recruitment,</h2>
    <p><strong>${name}</strong> sent you a message:</p>
    <p>${message}</p>
  `;

  const result = await sendEmail({
    name,
    sender: process.env.SENDGRID_SENDER,     // Must be a verified sender in SendGrid
    receiver: process.env.SENDGRID_RECEIVER, // Who should receive it
    subject,
    text: message,
    html,
  });

  return Response.json(result);
}
 */
