
'use server';

/**
 * @fileOverview A Genkit flow to handle career application submissions (internships, workshops) and send an email notification.
 *
 * - handleCareerApplication - Processes the application.
 * - CareerApplicationInput - The input type for the handleCareerApplication function.
 * - CareerApplicationOutput - The return type for the handleCareerApplication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import nodemailer from 'nodemailer';

const CareerApplicationInputSchema = z.object({
  name: z.string().describe('The name of the applicant.'),
  email: z.string().email().describe('The email of the applicant.'),
  phone: z.string().optional().describe('The phone number of the applicant.'),
  programName: z.string().describe('The name of the program they are applying for (e.g., Utsavy Internship, AI Architect Masterclass).'),
  upiId: z.string().optional().describe('The UPI Transaction ID for paid programs.'),
  paymentScreenshot: z.string().optional().describe("A data URI of the payment screenshot. Expected format: 'data:image/...;base64,...'"),
});
export type CareerApplicationInput = z.infer<typeof CareerApplicationInputSchema>;

const CareerApplicationOutputSchema = z.object({
  reply: z.string().describe('A confirmation reply to be shown to the user.'),
});
export type CareerApplicationOutput = z.infer<typeof CareerApplicationOutputSchema>;

export async function handleCareerApplication(input: CareerApplicationInput): Promise<CareerApplicationOutput> {
  return careerApplicationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerApplicationPrompt',
  input: {schema: CareerApplicationInputSchema},
  output: {schema: CareerApplicationOutputSchema},
  prompt: `You are a communications director for Vasudev AI.
A user named {{{name}}} (email: {{{email}}}) has just registered for the "{{programName}}".

Your task is to generate a short, friendly, on-brand confirmation message.
If it's a paid program (like a masterclass), the message should confirm their registration is PENDING and tell them their payment is under review.
Otherwise, for free applications, just acknowledge their application and mention that next steps will be sent to their email.

Make it personal and inspiring.
Example for paid: "Signal received, {{{name}}}. Your registration for the {{programName}} is now in the cosmos and your payment proof is under review."
Example for free: "Application from {{{name}}} received. Keep an eye on your inbox for the next transmission."
`,
});

const careerApplicationFlow = ai.defineFlow(
  {
    name: 'careerApplicationFlow',
    inputSchema: CareerApplicationInputSchema,
    outputSchema: CareerApplicationOutputSchema,
  },
  async input => {
    const isAdminEmailConfigured = process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS;
    const adminEmailAddress = 'info@vasudev.online';

    // First, try to send an email notification about the new application.
    if (isAdminEmailConfigured) {
      try {
        const port = Number(process.env.EMAIL_PORT) || 587;
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: port,
          secure: port === 465,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
        
        const attachments = [];
        if (input.paymentScreenshot) {
            attachments.push({
                filename: 'payment-screenshot.png',
                path: input.paymentScreenshot
            });
        }

        const paymentInfoHtml = input.upiId 
          ? `
            <p><strong>UPI Transaction ID:</strong> ${input.upiId}</p>
            ${input.paymentScreenshot ? `<p style="color: #39FF14;"><strong>Payment Screenshot is attached.</strong></p>` : ''}
            ` 
          : '';

        await transporter.sendMail({
          from: `"Vasudev AI Applications" <${process.env.EMAIL_USER}>`,
          to: adminEmailAddress, // Admin email
          subject: `New Application for ${input.programName} from ${input.name}`,
          html: `
            <h1>New Application Received</h1>
            <p><strong>Program:</strong> ${input.programName}</p>
            <hr />
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            ${input.phone ? `<p><strong>Phone:</strong> ${input.phone}</p>` : ''}
            ${paymentInfoHtml}
          `,
          attachments: attachments,
        });
      } catch (error) {
        console.error('Failed to send application notification email:', error);
      }
    } else {
      console.log('Email environment variables not fully configured. Skipping email send.');
    }
    
    // Then, generate the confirmation reply for the user.
    const {output} = await prompt(input);
    return output!;
  }
);
