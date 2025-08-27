
'use server';

import { handleContactMessage } from "@/ai/flows/contact-message";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(1, 'Message is required.'),
});

export type FormState = {
  message: string;
  error: boolean;
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const validatedFields = FormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
      return {
        message: "Validation failed. Please check your inputs.",
        error: true,
      };
    }

    const { name, email, message } = validatedFields.data;

    const result = await handleContactMessage({
      name,
      email,
      message,
    });
    
    return {
      message: result.reply,
      error: false,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      error: true,
    };
  }
}
