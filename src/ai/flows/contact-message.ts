
'use server';

/**
 * @fileOverview A Genkit flow to handle contact form submissions.
 *
 * - handleContactMessage - A function that processes the contact message.
 * - ContactMessageInput - The input type for the handleContactMessage function.
 * - ContactMessageOutput - The return type for the handleContactMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
The message should acknowledge their submission and mention that the team will get back to them if a response is needed.
Keep it concise and positive. For example: "Thank you, {{{name}}}! Your message has been received by the council. We'll be in touch soon."
`,
});

const contactMessageFlow = ai.defineFlow(
  {
    name: 'contactMessageFlow',
    inputSchema: ContactMessageInputSchema,
    outputSchema: ContactMessageOutputSchema,
  },
  async input => {
    // In a real application, you would add logic here to save the message
    // to a database, send an email notification, etc.
    // For now, we will just generate a confirmation reply.
    const {output} = await prompt(input);
    return output!;
  }
);
