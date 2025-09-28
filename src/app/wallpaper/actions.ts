
'use server';

import { generateWallpaper } from "@/ai/flows/wallpaper-generator";
import { z } from "zod";

const FormSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required.'),
  size: z.enum(['portrait', 'landscape']),
});

export type FormState = {
  imageUrl: string | null;
  error: string | null;
};

export async function handleGenerateWallpaper(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const validatedFields = FormSchema.safeParse({
        prompt: formData.get('prompt'),
        size: formData.get('size'),
    });

    if (!validatedFields.success) {
      return {
        imageUrl: null,
        error: "Validation failed. A prompt is required.",
      };
    }

    const { prompt, size } = validatedFields.data;

    const result = await generateWallpaper({
      prompt,
      size,
    });

    return {
      imageUrl: result.imageUrl,
      error: null,
    };
  } catch (error) {
    console.error("Error generating wallpaper:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return {
      imageUrl: null,
      error: `Generation failed: ${errorMessage}. Please try again.`,
    };
  }
}
