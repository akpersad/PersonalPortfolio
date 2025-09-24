import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 5, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  userLimit.count++;
  return true;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  role?: string;
  website?: string;
}

function validateFormData(data: FormData) {
  const errors: string[] = [];

  // Required fields
  if (
    !data.name ||
    typeof data.name !== 'string' ||
    data.name.trim().length < 2
  ) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Please enter a valid email address');
    }
  }

  if (
    !data.message ||
    typeof data.message !== 'string' ||
    data.message.trim().length < 10
  ) {
    errors.push('Message is required and must be at least 10 characters');
  }

  // Check for suspicious content
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i,
    /expression\s*\(/i,
  ];

  const allText = `${data.name} ${data.email} ${data.message}`.toLowerCase();
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(allText)) {
      errors.push('Suspicious content detected');
      break;
    }
  }

  // Check for excessive links or spam-like content
  const linkCount = (data.message.match(/https?:\/\//g) || []).length;
  if (linkCount > 3) {
    errors.push('Too many links in message');
  }

  // Check message length (prevent extremely long messages)
  if (data.message.length > 2000) {
    errors.push('Message is too long');
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body.website) {
      // Bot detected, return success but don't send email
      return NextResponse.json({ success: true });
    }

    // Validate form data
    const validationErrors = validateFormData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Get inquiry type label
    const inquiryTypes: { [key: string]: string } = {
      'job-opportunity': 'Job Opportunity',
      consulting: 'Consulting Project',
      collaboration: 'Collaboration',
      other: 'Other',
    };

    const inquiryType = inquiryTypes[body.role] || 'General Inquiry';

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['akpersad@gmail.com'],
      subject: `New Contact Form Submission - ${inquiryType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5530; border-bottom: 2px solid #2c5530; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c5530; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="color: #2c5530; margin-top: 0;">Message</h3>
            <div style="white-space: pre-wrap; line-height: 1.6;">
              ${body.message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="margin-top: 30px; padding: 15px; background-color: #e8f5e8; border-radius: 8px; font-size: 14px; color: #2c5530;">
            <p><strong>Note:</strong> This message was sent from your portfolio contact form.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Contact Details:
- Name: ${body.name}
- Email: ${body.email}
- Inquiry Type: ${inquiryType}
- Submitted: ${new Date().toLocaleString()}

Message:
${body.message}

---
This message was sent from your portfolio contact form.
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        {
          error: 'Failed to send message. Please try again.',
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
