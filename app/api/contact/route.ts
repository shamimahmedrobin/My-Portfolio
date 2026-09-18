import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Persistent pooled transporter for fast connection reuse
let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter(emailUser: string, emailPass: string) {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      pool: true,
      maxConnections: 3,
      maxMessages: 100,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
  }
  return cachedTransporter;
}

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

    const transporter = getTransporter(emailUser, emailPass);

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
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="x-apple-disable-message-reformatting">
          <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
          <title>${emailSubject}</title>
        </head>
        <body style="margin: 0; padding: 12px 6px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #2563eb, #0d9488, #059669); padding: 24px 20px; text-align: left; color: #ffffff;">
                <div style="display: inline-block; background-color: rgba(255,255,255,0.22); font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">
                  ${isHireMe ? '✨ Hire Me Inquiry' : '📬 Portfolio Message'}
                </div>
                <h1 style="margin: 4px 0 0 0; font-size: 20px; font-weight: 700; line-height: 1.3; color: #ffffff;">
                  ${isHireMe ? 'New Project / Hire Inquiry' : 'New Contact Message'}
                </h1>
                <p style="margin: 6px 0 0 0; font-size: 13px; color: #f1f5f9; opacity: 0.95;">
                  Submitted by <strong style="color: #ffffff;">${fullName}</strong>
                </p>
              </td>
            </tr>

            <!-- Main Content Area -->
            <tr>
              <td style="padding: 20px 16px;">
                
                <!-- Sender Information Card -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 14px 16px;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin-bottom: 10px;">
                        Sender Information
                      </div>
                      
                      <!-- Full Name -->
                      <div style="padding: 6px 0; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.4px;">Full Name</div>
                        <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 2px; word-break: break-word;">${fullName}</div>
                      </div>

                      <!-- Email Address -->
                      <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.4px;">Email Address</div>
                        <div style="font-size: 14px; font-weight: 600; margin-top: 2px; word-break: break-all;">
                          <a href="mailto:${userEmail}" style="color: #2563eb; text-decoration: none;">${userEmail}</a>
                        </div>
                      </div>

                      <!-- Phone Number (if provided) -->
                      ${
                        userPhone
                          ? `
                      <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.4px;">Phone Number</div>
                        <div style="font-size: 14px; font-weight: 600; margin-top: 2px; word-break: break-word;">
                          <a href="tel:${userPhone}" style="color: #059669; text-decoration: none;">${userPhone}</a>
                        </div>
                      </div>
                      `
                          : ''
                      }

                      <!-- Subject -->
                      ${
                        userSubject
                          ? `
                      <div style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                        <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.4px;">Subject</div>
                        <div style="font-size: 14px; font-weight: 600; color: #0f172a; margin-top: 2px; word-break: break-word;">${userSubject}</div>
                      </div>
                      `
                          : ''
                      }

                      <!-- Submission Time -->
                      <div style="padding: 8px 0 2px 0;">
                        <div style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.4px;">Submission Time</div>
                        <div style="font-size: 13px; color: #475569; margin-top: 2px; line-height: 1.4; word-break: break-word;">${formattedTimestamp} (BST)</div>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Message / Requirements Card -->
                <div style="margin-bottom: 22px;">
                  <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin-bottom: 8px;">
                    ${isHireMe ? 'Project Scope & Requirements' : 'Message Details'}
                  </div>
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; padding: 14px 16px; border-radius: 10px; font-size: 14px; line-height: 1.65; color: #334155; white-space: pre-wrap; word-break: break-word; overflow-wrap: break-word;">${content}</div>
                </div>

                <!-- Responsive Quick Actions (Bulletproof Email Buttons) -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                  <tr>
                    <td style="padding-top: 14px; text-align: center;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin-bottom: 12px;">
                        Quick Actions
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom: ${userPhone ? '10px' : '0'};">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 360px;">
                        <tr>
                          <td align="center" style="border-radius: 10px; background-color: #2563eb;">
                            <a href="mailto:${userEmail}?subject=Re:%20${encodeURIComponent(userSubject || 'Your Project Inquiry via Portfolio')}" 
                               target="_blank"
                               style="display: block; width: 100%; padding: 13px 20px; font-size: 14px; font-weight: 600; color: #ffffff; text-align: center; text-decoration: none; border-radius: 10px; box-sizing: border-box;">
                              ✉️ Reply via Email
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  ${
                    userPhone
                      ? `
                  <tr>
                    <td align="center">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 360px;">
                        <tr>
                          <td align="center" style="border-radius: 10px; background-color: #059669;">
                            <a href="https://wa.me/${userPhone.replace(/[^0-9]/g, '')}" 
                               target="_blank"
                               style="display: block; width: 100%; padding: 13px 20px; font-size: 14px; font-weight: 600; color: #ffffff; text-align: center; text-decoration: none; border-radius: 10px; box-sizing: border-box;">
                              💬 Message on WhatsApp
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  `
                      : ''
                  }
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f8fafc; padding: 14px 20px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                This notification was generated from your personal portfolio: <a href="https://shamimahmedrobin.com" style="color: #64748b; font-weight: 600; text-decoration: none;">shamimahmedrobin.com</a>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // Fire email sending asynchronously in the background so the user gets an instant response (<100ms)
    // while the persistent Node.js container process handles SMTP delivery reliably.
    transporter
      .sendMail(mailOptions)
      .then((info) => {
        console.log('Hire inquiry email sent successfully:', info.messageId);
      })
      .catch((err) => {
        console.error('Background sendMail failed:', err);
      });

    return NextResponse.json(
      { success: true, message: 'Inquiry sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
