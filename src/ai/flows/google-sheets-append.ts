
'use server';
/**
 * @fileOverview A Genkit flow to append data to a Google Sheet.
 * This is designed to be called from other flows to store data.
 *
 * - appendToGoogleSheet - Appends a row of data to the configured Google Sheet.
 *
 * To use this, you must:
 * 1. Create a Google Sheet and get its ID from the URL.
 * 2. Create a Service Account in your Google Cloud project.
 * 3. Share the Google Sheet with the Service Account's email, giving it "Editor" permissions.
 * 4. Download the JSON key for the Service Account.
 * 5. Set the following environment variables in your .env file:
 *    - GOOGLE_SHEET_ID: The ID of your Google Sheet.
 *    - GOOGLE_SERVICE_ACCOUNT_EMAIL: The `client_email` from the JSON key.
 *    - GOOGLE_PRIVATE_KEY: The `private_key` from the JSON key (including the -----BEGIN... and -----END... parts).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { google } from 'googleapis';

const AppendToSheetInputSchema = z.record(z.string(), z.any()).describe('A key-value object representing the data to append. Keys will be matched to headers.');

const SHEET_NAME = 'Registrations'; // The name of the tab in your sheet.

export async function appendToGoogleSheet(input: z.infer<typeof AppendToSheetInputSchema>) {
  return appendToSheetFlow(input);
}

const appendToSheetFlow = ai.defineFlow(
  {
    name: 'appendToSheetFlow',
    inputSchema: AppendToSheetInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    // The private key needs to have its newlines restored.
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!sheetId || !serviceAccountEmail || !privateKey) {
        throw new Error("Google Sheets API credentials are not fully configured in environment variables.");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 1. Get headers to ensure correct column order
    const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${SHEET_NAME}!1:1`,
    });
    
    const headers = headerResponse.data.values?.[0];
    if (!headers || headers.length === 0) {
        // If no headers, create them from the input keys
        const inputHeaders = Object.keys(input);
        await sheets.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: `${SHEET_NAME}!A1`,
            valueInputOption: 'RAW',
            requestBody: {
                values: [inputHeaders],
            },
        });
        // And then append the values
         await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: `${SHEET_NAME}!A2`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [inputHeaders.map(header => input[header] ?? '')],
            },
        });
        return;
    }

    // 2. Map input data to the correct column order based on headers
    const rowData = headers.map(header => input[header] ?? '');

    // 3. Append the new row
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });
  }
);
