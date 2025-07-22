'use server';
/**
 * @fileOverview A personalized service recommendation AI agent.
 *
 * - personalizedServiceRecommendations - A function that handles the service recommendation process.
 * - PersonalizedServiceRecommendationsInput - The input type for the personalizedServiceRecommendations function.
 * - PersonalizedServiceRecommendationsOutput - The return type for the personalizedServiceRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedServiceRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The user preferences for salon services.'),
  pastSelections: z
    .string()
    .describe('The past salon service selections of the user.'),
  availableServices: z.string().describe('A list of available salon services.'),
});
export type PersonalizedServiceRecommendationsInput = z.infer<
  typeof PersonalizedServiceRecommendationsInputSchema
>;

const PersonalizedServiceRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of personalized salon service recommendations based on user preferences and past selections.'
    ),
});
export type PersonalizedServiceRecommendationsOutput = z.infer<
  typeof PersonalizedServiceRecommendationsOutputSchema
>;

export async function personalizedServiceRecommendations(
  input: PersonalizedServiceRecommendationsInput
): Promise<PersonalizedServiceRecommendationsOutput> {
  return personalizedServiceRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedServiceRecommendationsPrompt',
  input: {schema: PersonalizedServiceRecommendationsInputSchema},
  output: {schema: PersonalizedServiceRecommendationsOutputSchema},
  prompt: `You are an AI agent specializing in providing personalized salon service recommendations.

  Based on the user's preferences, past selections, and available services, provide a list of service recommendations that the user might be interested in.

  User Preferences: {{{userPreferences}}}
  Past Selections: {{{pastSelections}}}
  Available Services: {{{availableServices}}}

  Provide the recommendations in a simple, comma-separated list.
  `,
});

const personalizedServiceRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedServiceRecommendationsFlow',
    inputSchema: PersonalizedServiceRecommendationsInputSchema,
    outputSchema: PersonalizedServiceRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
