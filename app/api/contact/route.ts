import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, details, message, type } = body;

    // Support both 'details' (from HireModal) and 'message' (from Contact form)
    const content = (details || message || '').trim();
    const fullName = (name || '').trim();
    const userEmail = (email || '').trim();
    const userPhone = (phone || '').trim();
    const userSubject = (subject || '').trim();
    const isHireMe = type === 'hire' || Boolean(phone || subject || details);

    if (!fullName || !userEmail || !content) {
      return NextResponse.json(
        { error: 'Name, email, and message details are required' },
        { status: 400 }
      );
    }

    // Current Bangladesh Standard Time (BST, GMT+6)
    const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dhaka',
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(new Date());

    const emailSubject = isHireMe
      ? `[Hire Me Inquiry] ${fullName} - ${userSubject || 'New Project Request'}`
      : `[Portfolio Contact] Message from ${fullName}`;

    // Verify if email service is configured
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_APP_PASSWORD;

    if (!emailUser || !emailPass) {
      console.warn('EMAIL_USER or EMAIL_APP_PASSWORD not set. Logging submission:');
      console.log({
        type: isHireMe ? 'Hire Me' : 'Contact Form',
        fullName,
        userEmail,
        userPhone,
        userSubject,
        content,
        timestamp: formattedTimestamp,
      });

      return NextResponse.json(
        { message: 'Inquiry received successfully (development log mode)' },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"${fullName}" <${emailUser}>`,
      to: 'shamimahmedrobin5@gmail.com',
      replyTo: `"${fullName}" <${userEmail}>`,
      subject: emailSubject,
      text: `
=========================================
NEW ${isHireMe ? 'HIRE ME INQUIRY' : 'CONTACT MESSAGE'}
=========================================

Sender Full Name (সম্পূর্ণ নাম): ${fullName}
Email Address: ${userEmail}
Phone Number (ফোন নম্বর): ${userPhone || 'Not provided'}
Subject (বিষয়): ${userSubject || (isHireMe ? 'Project Inquiry' : 'General Message')}
Form Type: ${isHireMe ? 'Hire Me Modal' : 'Contact Section'}
Date & Time: ${formattedTimestamp} (BST)

Message / Project Details (বিস্তারিত):
-----------------------------------------
${content}
=========================================
      `.trim(),
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 24px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
            
            <!-- Header Banner -->
            <div style="background: linear-gradient(135deg, #2563eb, #0d9488, #059669); padding: 28px 24px; text-align: left; color: #ffffff;">
              <span style="display: inline-block; background-color: rgba(255,255,255,0.2); font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">
                ${isHireMe ? '✨ Hire Me Inquiry' : '📬 Portfolio Message'}
              </span>
              <h1 style="margin: 4px 0 0 0; font-size: 22px; font-weight: 700; line-height: 1.3;">
                ${isHireMe ? 'New Project / Hire Inquiry' : 'New Contact Message'}
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">
                Submitted by <strong>${fullName}</strong>
              </p>
            </div>

            <div style="padding: 24px;">
              <!-- Client Information Card -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 14px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 700;">
                  Sender Information
                </h3>
                
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; width: 130px; font-weight: 600;">Full Name:</td>
                    <td style="padding: 6px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email:</td>
                    <td style="padding: 6px 0;">
                      <a href="mailto:${userEmail}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${userEmail}</a>
                    </td>
                  </tr>
                  ${
                    userPhone
                      ? `
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Phone:</td>
                    <td style="padding: 6px 0;">
                      <a href="tel:${userPhone}" style="color: #059669; text-decoration: none; font-weight: 600;">${userPhone}</a>
                    </td>
                  </tr>
                  `
                      : ''
                  }
                  ${
                    userSubject
                      ? `
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Subject:</td>
                    <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${userSubject}</td>
                  </tr>
                  `
                      : ''
                  }
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Submission Time:</td>
                    <td style="padding: 6px 0; color: #64748b; font-size: 13px;">${formattedTimestamp} (BST)</td>
                  </tr>
                </table>
              </div>

              <!-- Message Details Card -->
              <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 700;">
                  ${isHireMe ? 'Project Scope & Requirements' : 'Message Details'}
                </h3>
                <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.7; color: #334155; white-space: pre-wrap;">${content}</div>
              </div>

              <!-- Action Buttons -->
              <div style="text-align: center; padding-top: 10px; border-top: 1px solid #e2e8f0; display: flex; justify-content: center; gap: 12px;">
                <a href="mailto:${userEmail}?subject=Re:%20${encodeURIComponent(userSubject || 'Your Inquiry via Portfolio')}" 
                   style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);">
                  Reply to ${fullName}
                </a>
                ${
                  userPhone
                    ? `
                <a href="https://wa.me/${userPhone.replace(/[^0-9]/g, '')}" 
                   style="display: inline-block; padding: 12px 20px; background-color: #059669; color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 14px; margin-left: 10px;">
                  WhatsApp
                </a>
                `
                    : ''
                }
              </div>

            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 14px 24px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
              This notification was generated from your personal portfolio: <strong>shamimahmedrobin.com</strong>
            </div>

          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Inquiry sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
