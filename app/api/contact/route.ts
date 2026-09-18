import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Shamim's Portfolio" <${process.env.EMAIL_USER}>`,
      to: 'shamimahmedrobin5@gmail.com', // Sending to this specific email
      replyTo: email, // This allows the built-in "Reply" button in Gmail to work correctly
      subject: `New Portfolio Contact Message`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w-2xl; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px;">New Message from Portfolio</h2>
          
          <div style="margin-bottom: 20px; background-color: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <p style="margin: 0 0 10px 0;"><strong style="color: #555;">Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
          </div>
          
          <div style="margin-bottom: 30px; background-color: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <p style="margin: 0 0 10px 0;"><strong style="color: #555;">Message:</strong></p>
            <p style="margin: 0; line-height: 1.6; color: #444; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center;">
            <a href="mailto:${email}?subject=Reply%20from%20Shamim%20Ahmed%20Robin" 
               style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
               Reply to ${name}
            </a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
