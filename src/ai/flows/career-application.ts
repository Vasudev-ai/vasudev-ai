'use server';

/**
 * @fileOverview A flow to handle career application form submissions and save them to Google Sheets.
 *
 * - handleCareerApplication - A function that processes the career application.
 * - CareerApplicationInput - The input type for the handleCareerApplication function.
 */

import { z } from 'genkit';
import { appendToSheet } from '@/services/google-sheets';

const CareerApplicationInputSchema = z.object({
  name: z.string().describe("The applicant's full name."),
  email: z.string().email().describe("The applicant's email address."),
  mobile: z.string().describe("The applicant's mobile number."),
  location: z.string().describe("The applicant's location (City, State)."),
  portfolio: z.string().url().or(z.literal('')).optional().describe("A link to the applicant's portfolio."),
  github: z.string().url().or(z.literal('')).optional().describe("A link to the applicant's GitHub profile."),
  linkedin: z.string().url().or(z.literal('')).optional().describe("A link to the applicant's LinkedIn profile."),
  resumeLink: z.string().url().or(z.literal('')).optional().describe("A link to the applicant's resume (e.g., Google Drive)."),
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

export async function handleCareerApplication(input: CareerApplicationInput): Promise<{ success: boolean; message: string }> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = 'Internship Applications';

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID is not configured in environment variables.');
  }

  try {
    const headers = Object.keys(input);
    const rows = [Object.values(input)];

    await appendToSheet(spreadsheetId, sheetName, headers, rows);
    
    return {
      success: true,
      message: "Thank you for your application! We have received your submission and the council will be in touch if your skills align with our journey.",
    };
  } catch (error) {
    console.error('Failed to save application to Google Sheet:', error);
    if (error instanceof Error) {
        return { success: false, message: `An error occurred while saving your application: ${error.message}` };
    }
    return { success: false, message: 'An unknown error occurred while saving your application.' };
  }
}
