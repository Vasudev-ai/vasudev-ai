
'use server';

import { handleCareerApplication } from "@/ai/flows/career-application";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  portfolio: z.string().url('A valid portfolio or resume link is required.'),
  role: z.string().min(1, 'Please select a role.'),
  coverLetter: z.string().min(10, 'Please tell us a bit about yourself (min. 10 characters).'),
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
        portfolio: formData.get('portfolio'),
        role: formData.get('role'),
        coverLetter: formData.get('coverLetter'),
    });

    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues.map(issue => issue.message).join(' ');
      return {
        message: `Validation failed: ${errorMessages}`,
        error: true,
      };
    }

    const { name, email, portfolio, role, coverLetter } = validatedFields.data;

    const result = await handleCareerApplication({
      name,
      email,
      portfolio,
      role,
      coverLetter,
    });
    
    return {
      message: result.reply,
      error: false,
    };
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      error: true,
    };
  }
}
