import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, applicantName, applicantEmail, applicantPhone, jobTitle, pageUrl } = body;

    // Prepare email content
    const emailBody = `
New Job Application Received

Job Position: ${jobTitle}

Applicant Details:
- Name: ${applicantName}
- Email: ${applicantEmail}
- Phone: ${applicantPhone}

Page URL: ${pageUrl}
    `.trim();

    // Create a transporter using Gmail SMTP
    // You'll need to set up environment variables for email credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password',
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'noreply@waecorp.com',
      to: to,
      subject: subject,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">New Job Application Received</h2>
          
          <h3 style="color: #333; margin-top: 20px;">Job Position:</h3>
          <p style="font-size: 16px; color: #000; font-weight: bold;">${jobTitle}</p>
          
          <h3 style="color: #333; margin-top: 20px;">Applicant Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${applicantName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="mailto:${applicantEmail}">${applicantEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="tel:${applicantPhone}">${applicantPhone}</a></td>
            </tr>
          </table>
          
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            <strong>Application submitted from:</strong><br>
            <a href="${pageUrl}" style="color: #0066cc;">${pageUrl}</a>
          </p>
        </div>
      `,
    });

    console.log('Email sent successfully to:', to);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
