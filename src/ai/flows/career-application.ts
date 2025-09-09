
'use server';

/**
 * @fileOverview A Genkit flow to handle career application form submissions.
 *
 * - handleCareerApplication - A function that processes the career application.
 * - CareerApplicationInput - The input type for the handleCareerApplication function.
 * - CareerApplicationOutput - The return type for the handleCareerApplication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerApplicationInputSchema = z.object({
  name: z.string().describe('The name of the applicant.'),
  email: z.string().email().describe('The email of the applicant.'),
  portfolio: z.string().url().describe('A link to the applicant\'s portfolio or resume.'),
  role: z.string().describe('The role the applicant is applying for.'),
  coverLetter: z.string().describe('The applicant\'s cover letter or reason for applying.'),
});
export type CareerApplicationInput = z.infer<typeof CareerApplicationInputSchema>;

const CareerApplicationOutputSchema = z.object({
  reply: z.string().describe('A confirmation reply to be shown to the applicant.'),
});
export type CareerApplicationOutput = z.infer<typeof CareerApplicationOutputSchema>;

export async function handleCareerApplication(input: CareerApplicationInput): Promise<CareerApplicationOutput> {
  return careerApplicationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerApplicationPrompt',
  input: {schema: CareerApplicationInputSchema},
  output: {schema: CareerApplicationOutputSchema},
  prompt: `You are a hiring manager for Vasudev AI.
An applicant named {{{name}}} (email: {{{email}}}) has applied for the {{{role}}} role.

Portfolio: {{{portfolio}}}
Cover Letter: "{{{coverLetter}}}"

Your task is to generate a short, encouraging confirmation message.
Acknowledge their application for the specific role and let them know the team will review it.
Keep it on-brand, friendly, and professional.
For example: "Thank you for your application for the {{{role}}} role, {{{name}}}. The council will review your transmission. We'll be in touch if your skills align with our cosmic journey."
`,
});

const careerApplicationFlow = ai.defineFlow(
  {
    name: 'careerApplicationFlow',
    inputSchema: CareerApplicationInputSchema,
    outputSchema: CareerApplicationOutputSchema,
  },
  async input => {
    // In a real application, you would add logic here to:
    // 1. Send an email notification to the hiring team.
    // 2. Save the application to a database (e.g., Firestore).
    // For now, we'll just log it to the console.
    console.log('New Career Application Received:', input);
    
    const {output} = await prompt(input);
    return output!;
  }
);
