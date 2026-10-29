
'use server';

/**
 * @fileOverview A Genkit flow to handle contact form submissions and send an email notification using Resend.
 *
 * - handleContactMessage - A function that processes the contact message.
 * - ContactMessageInput - The input type for the handleContactMessage function.
 * - ContactMessageOutput - The return type for the handleContactMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { Resend } from 'resend';


const ContactMessageInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email of the person sending the message.'),
  message: z.string().describe('The content of the message.'),
});
export type ContactMessageInput = z.infer<typeof ContactMessageInputSchema>;

const ContactMessageOutputSchema = z.object({
  reply: z.string().describe('A confirmation reply to be shown to the user.'),
});
export type ContactMessageOutput = z.infer<typeof ContactMessageOutputSchema>;

export async function handleContactMessage(input: ContactMessageInput): Promise<ContactMessageOutput> {
  return contactMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contactMessagePrompt',
  input: {schema: ContactMessageInputSchema},
  output: {schema: ContactMessageOutputSchema},
  prompt: `You are a communications director for Vasudev AI, a divine-tech community.
A user named {{{name}}} (email: {{{email}}}) has sent the following message:
"{{{message}}}"

Your task is to generate a short, friendly, on-brand confirmation message to be displayed to the user after they submit the form.
The message should acknowledge their submission, use their name for personalization, and mention that the team will get back to them if a response is needed.
Make it personal and on-brand. For example: "Transmission from {{{name}}} received. The cosmos thanks you. We'll be in touch if a response is needed."
`,
});

const contactMessageFlow = ai.defineFlow(
  {
    name: 'contactMessageFlow',
    inputSchema: ContactMessageInputSchema,
    outputSchema: ContactMessageOutputSchema,
  },
  async input => {
    if (process.env.RESEND_API_KEY) {
       const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        const result = await resend.emails.send({
          from: `Vasudev AI Contact <contact@vasudevai.in>`,
          to: 'info@vasudevai.in',
          cc: ['surya@vasudevai.in'],
          subject: `New Contact Message from ${input.name}`,
          replyTo: input.email,
          html: `
            <h1>New Message from Vasudev AI Contact Form</h1>
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${input.message}</p>
          `,
        });
        if (result.error) {
          console.error('❌ Resend API error (contact message):', result.error);
        } else {
          console.log('✅ Contact email sent. id:', result.data?.id);
        }
      } catch (error) {
        console.error('❌ Resend failed to send contact form email:', error);
      }
    } else {
      console.log('RESEND_API_KEY environment variable not configured. Skipping email send.');
    }
    
    const {output} = await prompt(input);
    return output!;
  }
);
