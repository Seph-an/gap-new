//lib/MailAgent.js
import { sendEmail } from "./SendMail";
import Inquirer from "@/components/Mail/Inquirer";
import Inquiry from "@/components/Mail/Inquiry";
import { render } from "@react-email/render";

const InquiryMail = process.env.NEXT_PUBLIC_INQUIRY_MAIL;
const EmployerMail = process.env.NEXT_PUBLIC_EMPLOYER_MAIL;

export async function mailAgent({ name, email, phone, role, message }) {
  if (!name || !email || !message || !phone || !role) {
    return {
      success: false,
      error: "Missing required fields: name, email, or message",
    };
  }

  try {
    const clientHTML = await render(<Inquirer name={name} role={role} />);
    const gapHTML = await render(
      <Inquiry name={name} email={email} phone={phone} message={message} />
    );

    // Send email to the client
    await sendEmail({
      sender: InquiryMail,
      receiver: email,
      subject: `Inquiry Received, Thank You - Gap Recruitment`,
      html: clientHTML,
    });

    // Determine recipient for Gap Recruitment
    const toGap = role === "jobseeker" ? InquiryMail : EmployerMail;

    // Send email to Gap Recruitment
    await sendEmail({
      sender: InquiryMail,
      receiver: toGap,
      subject: "Inquiry From Gap Website Form",
      html: gapHTML,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: error.message };
  }
}
