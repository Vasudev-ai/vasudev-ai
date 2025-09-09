
'use server';

import { google } from 'googleapis';

/**
 * Appends data to a Google Sheet.
 * @param spreadsheetId The ID of the Google Sheet.
 * @param sheetName The name of the sheet (tab) to append to.
 * @param headers An array of strings for the header row.
 * @param rows A 2D array of values to append.
 */
export async function appendToSheet(
  spreadsheetId: string,
  sheetName: string,
  headers: string[],
  rows: any[][]
): Promise<void> {
  if (
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY
  ) {
    throw new Error(
      'Google service account credentials are not set in environment variables.'
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    // Check if the sheet exists
    const sheetInfo = await sheets.spreadsheets.get({
        spreadsheetId,
    });
    
    const sheetExists = sheetInfo.data.sheets?.some(s => s.properties?.title === sheetName);

    // If the sheet doesn't exist, create it
    if (!sheetExists) {
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: [{
                    addSheet: {
                        properties: {
                            title: sheetName
                        }
                    }
                }]
            }
        });
    }

    // Check if headers are present
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!1:1`,
    });

    // If headers are not present, add them
    if (!headerCheck.data.values || headerCheck.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });
    }

    // Append the new data rows
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetName,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: rows,
      },
    });

  } catch (err) {
    console.error('The API returned an error: ' + err);
    throw new Error('Failed to append data to Google Sheet.');
  }
}
