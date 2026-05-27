import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  project: z.string().min(5, 'Message must be at least 5 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate inputs using Zod
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, project } = result.data;

    // Save to the database
    const savedMessage = await prisma.contactMessage.create({
      data: { name, email, project },
    });

    // Optional: Send email notification via Resend if API key is provided
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: process.env.NOTIFICATION_EMAIL || email,
            subject: `New Portfolio Message from ${name}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 8px;">
                <h2 style="color: #0284c7; margin-top: 0;">New Message Received</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <div style="background-color: #f4f4f5; padding: 15px; border-radius: 4px; white-space: pre-wrap; font-family: monospace;">${project}</div>
                <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
                <p style="font-size: 12px; color: #71717a;">Sent from Dhiraj Sharma's Portfolio App</p>
              </div>
            `,
          }),
        });
      } catch (err) {
        console.error('Error sending email notification via Resend:', err);
      }
    }

    return NextResponse.json(
      { message: 'Message sent successfully!', data: savedMessage },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
