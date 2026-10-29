'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { internshipRoles } from '@/lib/internship-data';

const FormSchema = z.object({
  role: z.string().min(1, 'Please select the role you are applying for.'),
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  portfolio: z.string().optional(),
  message: z.string().optional(),
});

export type FormState = {
  message: string;
  error: boolean;
};

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c
  );

export async function submitInternshipApplication(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = FormSchema.safeParse({
      role: formData.get('role'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || undefined,
      portfolio: formData.get('portfolio') || undefined,
      message: formData.get('message') || undefined,
    });

    if (!validatedFields.success) {
      return {
        message: validatedFields.error.issues[0]?.message ?? 'Validation failed. Please check your inputs.',
        error: true,
      };
    }

    const { role, name, email, phone, portfolio, message } = validatedFields.data;
    const roleTitle = internshipRoles.find((r) => r.slug === role)?.title ?? role;

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: `Vasudev AI Applications <applications@vasudevai.in>`,
          to: 'info@vasudevai.in',
          replyTo: email,
          subject: `Internship Application — ${roleTitle} — ${name}`,
          html: `
            <h1>New Internship Application Received</h1>
            <p><strong>Role:</strong> ${escapeHtml(roleTitle)}</p>
            <hr />
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
            ${portfolio ? `<p><strong>Portfolio / GitHub:</strong> ${escapeHtml(portfolio)}</p>` : ''}
            ${
              message
                ? `<hr /><p><strong>Why this role / message:</strong></p><p>${escapeHtml(message)}</p>`
                : ''
            }
          `,
        });
      } catch (error) {
        console.error('Resend failed to send internship application email:', error);
      }
    } else {
      console.log('RESEND_API_KEY environment variable not configured. Skipping email send.');
    }

    return {
      message: `Signal received, ${name}. Your application for the ${roleTitle} is in — keep an eye on your inbox for the next transmission.`,
      error: false,
    };
  } catch (error) {
    console.error('Error submitting internship application:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      error: true,
    };
  }
}
