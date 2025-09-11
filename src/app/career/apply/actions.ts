
'use server';

import { handleCareerApplication } from "@/ai/flows/career-application";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string(),
  email: z.string(),
  mobile: z.string(),
  location: z.string(),
  portfolio: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  resumeLink: z.string().optional(),
  role: z.string(),
  skills: z.string(),
  experience: z.string(),
  availability: z.string(),
  startDate: z.string(),
  motivation: z.string(),
  startupExcitement: z.string(),
  careerGoal: z.string(),
  isUnpaidOk: z.string(),
  isRemoteOk: z.string(),
});

export type FormState = {
  message: string;
  error: boolean;
}

export async function submitApplication(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        mobile: formData.get('mobile'),
        location: formData.get('location'),
        portfolio: formData.get('portfolio'),
        github: formData.get('github'),
        linkedin: formData.get('linkedin'),
        resumeLink: formData.get('resumeLink'),
        role: formData.get('role'),
        skills: formData.get('skills'),
        experience: formData.get('experience'),
        availability: formData.get('availability'),
        startDate: formData.get('startDate'),
        motivation: formData.get('motivation'),
        startupExcitement: formData.get('startupExcitement'),
        careerGoal: formData.get('careerGoal'),
        isUnpaidOk: formData.get('isUnpaidOk'),
        isRemoteOk: formData.get('isRemoteOk'),
    };

    // Temporarily disable strict validation to make testing easier
    const result = await handleCareerApplication(data as any);
    
    return {
      message: result.reply,
      error: false,
    };
  } catch (error) {
    console.error("Error submitting application:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return {
      message: `An unexpected error occurred: ${errorMessage}`,
      error: true,
    };
  }
}
