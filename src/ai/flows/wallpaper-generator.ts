// This file uses server-side code.
'use server';

/**
 * @fileOverview An AI-driven tool for generating custom wallpapers with a "divine + futuristic" aesthetic.
 *
 * - generateWallpaper - A function that handles the wallpaper generation process.
 * - GenerateWallpaperInput - The input type for the generateWallpaper function.
 * - GenerateWallpaperOutput - The return type for the generateWallpaper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWallpaperInputSchema = z.object({
  prompt: z.string().describe('The user\'s creative idea for the wallpaper.'),
  size: z.enum(['portrait', 'landscape']).describe('The orientation of the wallpaper: "portrait" for mobile or "landscape" for desktop.'),
});
export type GenerateWallpaperInput = z.infer<typeof GenerateWallpaperInputSchema>;

const GenerateWallpaperOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated wallpaper image.'),
});
export type GenerateWallpaperOutput = z.infer<typeof GenerateWallpaperOutputSchema>;

export async function generateWallpaper(input: GenerateWallpaperInput): Promise<GenerateWallpaperOutput> {
  return generateWallpaperFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWallpaperPrompt',
  input: {schema: GenerateWallpaperInputSchema},
  output: {schema: GenerateWallpaperOutputSchema},
  prompt: `
    Generate a high-quality, cinematic, futuristic mobile wallpaper with a divine aesthetic.
    The scene should be: {{{prompt}}}.
    Incorporate glowing elements, a deep navy-black and vibrant cyan color palette, and a sense of cosmic scale.
    The style should be a blend of digital art, sci-fi, and spiritual themes.
    The output should be suitable for a {{size}} screen.
  `,
});

const generateWallpaperFlow = ai.defineFlow(
  {
    name: 'generateWallpaperFlow',
    inputSchema: GenerateWallpaperInputSchema,
    outputSchema: GenerateWallpaperOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `
        Generate a high-quality, cinematic, futuristic mobile wallpaper with a divine aesthetic.
        The scene should be: ${input.prompt}.
        Incorporate glowing elements, a deep navy-black and vibrant cyan color palette, and a sense of cosmic scale.
        The style should be a blend of digital art, sci-fi, and spiritual themes.
        The output should be suitable for a ${input.size} screen.
      `,
      config: {
        aspectRatio: input.size === 'portrait' ? '9:16' : '16:9',
      }
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }

    return { imageUrl: media.url };
  }
);
