
'use server';

/**
 * @fileOverview A Genkit flow to handle career application submissions and send an email notification using Resend.
 *
 * - handleCareerApplication - Processes the application.
 * - CareerApplicationInput - The input type for the handleCareerApplication function.
 * - CareerApplicationOutput - The return type for the handleCareerApplication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { Resend } from 'resend';

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
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const adminEmailAddress = 'info@vasudevai.in';

      try {
        const attachments = [];
        if (input.paymentScreenshot) {
            const buffer = Buffer.from(input.paymentScreenshot.split('base64,')[1], 'base64');
            attachments.push({
                filename: 'payment-screenshot.png',
                content: buffer,
            });
        }
        
        const paymentInfoHtml = input.upiId 
          ? `
            <p><strong>UPI Transaction ID:</strong> ${input.upiId}</p>
            ${input.paymentScreenshot ? `<p style="color: #39FF14;"><strong>Payment Screenshot is attached.</strong></p>` : ''}
            ` 
          : '';

        const result = await resend.emails.send({
          from: `Vasudev AI Applications <applications@vasudevai.in>`,
          to: adminEmailAddress,
          cc: ['surya@vasudevai.in'],
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
        if (result.error) {
          console.error('❌ Resend API error (career application):', result.error);
        } else {
          console.log('✅ Career application email sent. id:', result.data?.id);
        }
      } catch (error) {
        console.error('❌ Resend failed to send application notification email:', error);
        // We don't throw an error here to avoid failing the whole flow if email fails.
        // The primary action is to get the AI reply.
      }
    } else {
      console.log('RESEND_API_KEY environment variable not configured. Skipping email send.');
    }
    
    const {output} = await prompt(input);
    return output!;
  }
);
