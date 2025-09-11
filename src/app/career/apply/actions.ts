
'use server';

import { handleCareerApplication } from "@/ai/flows/career-application";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('A valid email is required.'),
  mobile: z.string().min(1, 'Mobile number is required.'),
  location: z.string().min(1, 'Location is required.'),
  portfolio: z.union([z.string().url().optional(), z.literal('')]),
  github: z.union([z.string().url().optional(), z.literal('')]),
  linkedin: z.union([z.string().url().optional(), z.literal('')]),
  resumeLink: z.union([z.string().url().optional(), z.literal('')]),
  role: z.string().min(1, 'Please select a role.'),
  skills: z.string().min(1, 'Please list your skills.'),
  experience: z.string().min(1, 'Please describe your experience.'),
  availability: z.string({ required_error: 'Please confirm your availability.' }),
  startDate: z.string().min(1, 'Please select a start date.'),
  motivation: z.string().min(1, 'Please share your motivation.'),
  startupExcitement: z.string().min(1, 'This field is required.'),
  careerGoal: z.string().min(1, 'Please share your career goal.'),
  isUnpaidOk: z.string({ required_error: 'Please confirm your agreement.' }),
  isRemoteOk: z.string({ required_error: 'Please confirm your preference.' }),
});

export type FormState = {
  message: string;
  error: boolean;
}

export async function submitApplication(prevState: FormState, formData: FormData): Promise<FormState> {
  const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      location: formData.get('location'),
      portfolio: formData.get('portfolio') || '',
      github: formData.get('github') || '',
      linkedin: formData.get('linkedin') || '',
      resumeLink: formData.get('resumeLink') || '',
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

  const validatedFields = FormSchema.safeParse(data);

  if (!validatedFields.success) {
    const errorList = validatedFields.error.errors.map(e => `- ${e.path.join('.')}: ${e.message}`).join('\n');
    const errorMessage = `Please correct the following errors:\n${errorList}`;
    return {
      message: errorMessage,
      error: true,
    }
  }
  
  try {
    const result = await handleCareerApplication(validatedFields.data);
    
    return {
      message: result.message,
      error: !result.success,
    };
  } catch (error) {
    console.error("Error submitting application:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return {
      message: `An unexpected server error occurred: ${errorMessage}`,
      error: true,
    };
  }
}
