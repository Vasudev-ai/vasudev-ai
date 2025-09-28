
'use server';

import { handleCareerApplication } from "@/ai/flows/career-application";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  upiId: z.string().min(1, 'UPI Transaction ID is required.'),
});

export type FormState = {
  message: string;
  error: boolean;
  isSuccess: boolean;
}

export async function submitRegistrationForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const validatedFields = FormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        upiId: formData.get('upiId'),
    });

    if (!validatedFields.success) {
      const firstError = validatedFields.error.errors[0].message;
      return {
        message: firstError || "Validation failed. Please check your inputs.",
        error: true,
        isSuccess: false,
      };
    }

    const { name, email, phone, upiId } = validatedFields.data;

    const result = await handleCareerApplication({
      programName: 'AI Architect Masterclass',
      name,
      email,
      phone,
      upiId,
    });
    
    return {
      message: result.reply,
      error: false,
      isSuccess: true,
    };
  } catch (error) {
    console.error("Error submitting registration form:", error);
    return {
      message: 'An unexpected server error occurred. Please try again.',
      error: true,
      isSuccess: false,
    };
  }
}
