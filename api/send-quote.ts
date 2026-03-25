import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_6burMroo_JFE38CHYc4kdmXNXs7ZDYXJ2');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, phone, service, message } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'jerrodjey@gmail.com', // consider adding process.env.CONTACT_EMAIL
      subject: `New Quote Request: ${name}`,
      text: `
New Plumbing Quote Request
---------------------------
Full Name: ${name}
Phone Number: ${phone}
Service Needed: ${service}
Message: ${message || 'No additional message'}

Sent via Drainman Plumbing Website
      `.trim(),
    });

    if (error) {
      console.error("Resend Error Details:", JSON.stringify(error, null, 2));
      return res.status(400).json({ success: false, error: error.message, details: error });
    }

    console.log("Email sent successfully:", data?.id);
    res.json({ success: true, message: "Quote request received successfully!" });
  } catch (err) {
    console.error("Server Exception:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
