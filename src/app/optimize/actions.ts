'use server';

import { optimizeContentPlacement } from "@/ai/flows/content-optimization";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
});

export async function handleOptimizeContent(prevState: any, formData: FormData) {
  try {
    const validatedFields = FormSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
      return {
        keywords: [],
        suggestions: '',
        error: "Validation failed. Title and description are required.",
      };
    }

    const { title, description } = validatedFields.data;

    const result = await optimizeContentPlacement({
      title,
      description,
    });

    return {
      keywords: result.keywords,
      suggestions: result.suggestions,
      error: null,
    };
  } catch (error) {
    console.error("Error optimizing content:", error);
    return {
      keywords: [],
      suggestions: '',
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
