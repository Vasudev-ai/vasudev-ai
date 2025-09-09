
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
import { appendToSheet } from '@/services/google-sheets';

const CareerApplicationInputSchema = z.object({
  name: z.string().describe("The applicant's full name."),
  email: z.string().email().describe("The applicant's email address."),
  mobile: z.string().describe("The applicant's mobile number."),
  location: z.string().describe("The applicant's location (City, State)."),
  portfolio: z.string().url().optional().describe("A link to the applicant's portfolio."),
  github: z.string().url().optional().describe("A link to the applicant's GitHub profile."),
  linkedin: z.string().url().optional().describe("A link to the applicant's LinkedIn profile."),
  resumeLink: z.string().url().optional().describe("A link to the applicant's resume (e.g., Google Drive)."),
  role: z.string().describe('The role the applicant is applying for.'),
  skills: z.string().describe("The applicant's listed skills."),
  experience: z.string().describe("The applicant's description of previous projects or experience."),
  availability: z.string().describe("If the applicant is available for 2 months, 4-5 hours daily."),
  startDate: z.string().describe("The applicant's preferred start date."),
  motivation: z.string().describe("The applicant's reason for wanting to join Utsavy."),
  startupExcitement: z.string().describe("What excites the applicant about working with a startup and AI tools."),
  careerGoal: z.string().describe("The applicant's career goal in the next 1-2 years."),
  isUnpaidOk: z.string().describe("If the applicant agrees that some roles are unpaid."),
  isRemoteOk: z.string().describe("If the applicant is okay with a remote work environment."),
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
  prompt: `You are a hiring manager for Vasudev AI, reviewing an internship application for a partner startup, Utsavy.
An applicant named {{{name}}} has applied for the {{{role}}} role.

**Candidate Details:**
- Email: {{{email}}}
- Mobile: {{{mobile}}}
- Location: {{{location}}}
- Portfolio: {{{portfolio}}}
- GitHub: {{{github}}}
- LinkedIn: {{{linkedin}}}
- Resume: {{{resumeLink}}}

**Skills & Experience:**
- Skills: {{{skills}}}
- Experience: "{{{experience}}}"

**Availability & Motivation:**
- Available for 2 months (4-5 hours/day): {{{availability}}}
- Preferred Start Date: {{{startDate}}}
- Motivation to join Utsavy: "{{{motivation}}}"
- Excitement for startups/AI: "{{{startupExcitement}}}"
- Career Goal (1-2 years): "{{{careerGoal}}}"

**Agreements:**
- Agrees some roles are unpaid: {{{isUnpaidOk}}}
- OK with remote work: {{{isRemoteOk}}}

Your task is to generate a short, encouraging confirmation message for the applicant.
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
    // Save the application to Google Sheets if configured
    if (process.env.GOOGLE_SHEET_ID) {
      try {
        const sheetName = 'Applications'; // You can customize this
        const headers = [
          'Timestamp', 'Name', 'Email', 'Mobile', 'Location', 'Role', 
          'Portfolio', 'GitHub', 'LinkedIn', 'Resume', 
          'Skills', 'Experience', 'Availability', 'Start Date', 
          'Motivation', 'Startup Excitement', 'Career Goal', 
          'Unpaid OK', 'Remote OK'
        ];
        const values = [
          new Date().toISOString(),
          input.name,
          input.email,
          input.mobile,
          input.location,
          input.role,
          input.portfolio || '',
          input.github || '',
          input.linkedin || '',
          input.resumeLink || '',
          input.skills,
          input.experience,
          input.availability,
          input.startDate,
          input.motivation,
          input.startupExcitement,
          input.careerGoal,
          input.isUnpaidOk,
          input.isRemoteOk
        ];
        await appendToSheet(process.env.GOOGLE_SHEET_ID, sheetName, headers, [values]);
        console.log('Successfully saved application to Google Sheets.');
      } catch (error) {
        console.error('Failed to save application to Google Sheets:', error);
        // We won't block the user response if this fails, just log the error.
      }
    } else {
        console.log('Google Sheet ID not configured. Skipping save to sheets.');
        console.log('New Career Application Received:', JSON.stringify(input, null, 2));
    }
    
    const {output} = await prompt(input);
    return output!;
  }
);
