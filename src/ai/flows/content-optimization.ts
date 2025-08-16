// This file uses server-side code.
'use server';

/**
 * @fileOverview An AI-driven tool that suggests optimal content placements by identifying the top keywords and phrases in page content.
 *
 * - optimizeContentPlacement - A function that handles the content placement optimization process.
 * - OptimizeContentPlacementInput - The input type for the optimizeContentPlacement function.
 * - OptimizeContentPlacementOutput - The return type for the optimizeContentPlacement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeContentPlacementInputSchema = z.object({
  title: z.string().describe('The title of the content.'),
  description: z.string().describe('The description of the content.'),
});
export type OptimizeContentPlacementInput = z.infer<typeof OptimizeContentPlacementInputSchema>;

const OptimizeContentPlacementOutputSchema = z.object({
  keywords: z.array(z.string()).describe('The top keywords and phrases identified in the content.'),
  suggestions: z.string().describe('Suggestions for optimal content placement based on the identified keywords.'),
});
export type OptimizeContentPlacementOutput = z.infer<typeof OptimizeContentPlacementOutputSchema>;

export async function optimizeContentPlacement(input: OptimizeContentPlacementInput): Promise<OptimizeContentPlacementOutput> {
  return optimizeContentPlacementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeContentPlacementPrompt',
  input: {schema: OptimizeContentPlacementInputSchema},
  output: {schema: OptimizeContentPlacementOutputSchema},
  prompt: `You are an AI-powered content optimization tool. Your task is to analyze the given content (title and description) and identify the top keywords and phrases. Based on these keywords, provide suggestions for optimal content placement to improve readability and engagement.

Title: {{{title}}}
Description: {{{description}}}

Identify the top keywords and phrases and suggest how to strategically align page elements.
`,
});

const optimizeContentPlacementFlow = ai.defineFlow(
  {
    name: 'optimizeContentPlacementFlow',
    inputSchema: OptimizeContentPlacementInputSchema,
    outputSchema: OptimizeContentPlacementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
