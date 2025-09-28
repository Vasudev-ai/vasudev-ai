
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
A user named {{{name}}} (email: {{{email}}}) has just applied for the "{{programName}}".

Your task is to generate a short, friendly, on-brand confirmation message.
The message should acknowledge their application for the specific program and mention that next steps or a confirmation will be sent to their email.
Make it personal and inspiring.
For example: "Signal received, {{{name}}}. Your application for the {{programName}} is now part of the cosmos. Keep an eye on your inbox for the next transmission."
`,
});

const careerApplicationFlow = ai.defineFlow(
  {
    name: 'careerApplicationFlow',
    inputSchema: CareerApplicationInputSchema,
    outputSchema: CareerApplicationOutputSchema,
  },
  async input => {
    // First, try to send an email notification about the new application.
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
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

        await transporter.sendMail({
          from: `"Vasudev AI Applications" <${process.env.EMAIL_USER}>`,
          to: 'info@vasudev.online', // Admin email
          subject: `New Application for ${input.programName} from ${input.name}`,
          html: `
            <h1>New Application Received</h1>
            <p><strong>Program:</strong> ${input.programName}</p>
            <hr />
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            ${input.phone ? `<p><strong>Phone:</strong> ${input.phone}</p>` : ''}
            ${input.upiId ? `<p><strong>UPI Transaction ID:</strong> ${input.upiId}</p>` : ''}
          `,
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
