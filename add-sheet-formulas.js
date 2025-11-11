const { google } = require('googleapis');

const SHEET_ID = '1xEM31bGm3TH564wIxlgPS4f4BfEgk4dsPSpyxwZE_rY';

async function addFormulas() {
    const auth = new google.auth.GoogleAuth({
        keyFile: './google-credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    // Define the events from your site
    const events = [
        'bowling',
        'rein feiern',
        'brunch',
        'walk-&-gemäldegalerie',
        'dinner'
    ];

    // Create summary header
    const summaryData = [
        ['', '', '', '', '', 'EVENT SUMMARY', '', ''],
        ['', '', '', '', '', 'Event', 'RSVPs', 'Total People'],
    ];

    // Add formula rows for each event
    events.forEach((event, index) => {
        const row = index + 3; // Starting from row 3
        summaryData.push([
            '', '', '', '', '',
            event,
            `=COUNTIF(B:B,"${event}")`, // Count RSVPs
            `=SUMIF(B:B,"${event}",D:D)+COUNTIF(B:B,"${event}")` // Total people (RSVPs + plus ones)
        ]);
    });

    // Add grand total
    summaryData.push([
        '', '', '', '', '',
        'TOTAL',
        '=SUM(G3:G' + (2 + events.length) + ')',
        '=SUM(H3:H' + (2 + events.length) + ')'
    ]);

    // Write to sheet
    await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: 'A1:H' + (3 + events.length),
        valueInputOption: 'USER_ENTERED', // This makes formulas work
        resource: {
            values: summaryData
        }
    });

    console.log('✅ Formulas added to Google Sheet!');
    console.log('📊 Summary section added in columns F-H');
}

addFormulas().catch(console.error);
