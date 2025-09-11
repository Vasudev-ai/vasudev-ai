
'use server';

import { handleCareerApplication } from "@/ai/flows/career-application";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  mobile: z.string().min(10, 'A valid mobile number is required.'),
  location: z.string().min(2, 'Location is required.'),
  portfolio: z.string().url('Invalid URL.').optional().or(z.literal('')),
  github: z.string().url('Invalid URL.').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid URL.').optional().or(z.literal('')),
  resumeLink: z.string().url('Invalid URL.').optional().or(z.literal('')),
  role: z.string().min(1, 'Please select a role.'),
  skills: z.string().min(10, 'Please list some of your skills.'),
  experience: z.string().min(10, 'Please describe your experience.'),
  availability: z.enum(['Yes', 'No'], { required_error: 'Please select an availability option.' }),
  startDate: z.string().min(1, 'Please select a start date.'),
  motivation: z.string().min(10, 'Please tell us your motivation.'),
  startupExcitement: z.string().min(10, 'Please share your excitement.'),
  careerGoal: z.string().min(10, 'Please describe your career goal.'),
  isUnpaidOk: z.enum(['Yes', 'No'], { required_error: 'This confirmation is required.' }),
  isRemoteOk: z.enum(['Yes', 'No'], { required_error: 'This confirmation is required.' }),
});

export type FormState = {
  message: string;
  error: boolean;
}

export async function submitApplication(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const validatedFields = FormSchema.safeParse({
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
    });

    if (!validatedFields.success) {
      const errorList = validatedFields.error.issues.map(issue => `• ${issue.path.join('.')} - ${issue.message}`);
      return {
        message: `Please correct the following errors:\n${errorList.join('\n')}`,
        error: true,
      };
    }
    
    // We can now safely use the validated data
    const result = await handleCareerApplication(validatedFields.data);
    
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
