const express = require('express');
const path = require('path');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Google Sheets configuration
const SHEET_ID = '1xEM31bGm3TH564wIxlgPS4f4BfEgk4dsPSpyxwZE_rY';

// Initialize Google Sheets API
let sheets;

async function initializeGoogleSheets() {
    try {
        let auth;

        // In production (Northflank), use environment variable
        if (process.env.GOOGLE_CREDENTIALS_JSON) {
            const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
            auth = new google.auth.GoogleAuth({
                credentials: credentials,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
        } else {
            // In development, use local file
            auth = new google.auth.GoogleAuth({
                keyFile: './google-credentials.json',
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
        }

        const authClient = await auth.getClient();
        sheets = google.sheets({ version: 'v4', auth: authClient });

        console.log('✅ Google Sheets API initialized');

        // Initialize sheet headers if empty
        await initializeSheetHeaders();
    } catch (error) {
        console.error('❌ Error initializing Google Sheets:', error.message);
        throw error;
    }
}

// Initialize sheet with headers if needed
async function initializeSheetHeaders() {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: 'A1:D1',
        });

        // If first row is empty, add headers
        if (!response.data.values || response.data.values.length === 0) {
            await sheets.spreadsheets.values.update({
                spreadsheetId: SHEET_ID,
                range: 'A1:D1',
                valueInputOption: 'RAW',
                resource: {
                    values: [['Timestamp', 'Event', 'Name', 'Plus Ones']]
                }
            });
            console.log('✅ Sheet headers initialized');
        }
    } catch (error) {
        console.error('Error initializing headers:', error.message);
    }
}

// Add RSVP to Google Sheet
async function addRSVPToSheet(eventId, name, plusOnes) {
    try {
        const timestamp = new Date().toISOString();
        const values = [[timestamp, eventId, name, plusOnes || 0]];

        console.log('📝 Attempting to add RSVP:', {
            timestamp,
            eventId,
            name,
            plusOnes,
            valuesArray: values
        });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SHEET_ID,
            range: 'A:D',
            valueInputOption: 'RAW',
            resource: { values }
        });

        console.log('✅ RSVP added successfully:', response.data);

        return { success: true };
    } catch (error) {
        console.error('❌ Error adding RSVP:', error.message);
        console.error('Full error:', error);
        throw error;
    }
}

// Get RSVPs for a specific event
async function getRSVPsForEvent(eventId) {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: 'A:D',
        });

        const rows = response.data.values || [];

        // Skip header row and filter by event
        const rsvps = rows.slice(1)
            .filter(row => row[1] === eventId)
            .map((row, index) => ({
                id: index + 1,
                name: row[2] || '',
                plus_ones: parseInt(row[3]) || 0
            }));

        return rsvps;
    } catch (error) {
        console.error('Error getting RSVPs:', error.message);
        throw error;
    }
}

// Get all RSVPs
async function getAllRSVPs() {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: 'A:D',
        });

        const rows = response.data.values || [];

        // Skip header row
        const rsvps = rows.slice(1).map((row, index) => ({
            id: index + 1,
            created_at: row[0] || '',
            event_id: row[1] || '',
            name: row[2] || '',
            plus_ones: parseInt(row[3]) || 0
        }));

        return rsvps;
    } catch (error) {
        console.error('Error getting all RSVPs:', error.message);
        throw error;
    }
}

// API Routes

// Get all RSVPs for an event
app.get('/api/rsvps/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const attendees = await getRSVPsForEvent(eventId);
        res.json({ attendees });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch RSVPs' });
    }
});

// Add RSVP
app.post('/api/rsvps', async (req, res) => {
    try {
        const { eventId, name, plusOnes } = req.body;

        console.log('📨 Received RSVP request:', {
            eventId,
            name,
            plusOnes,
            body: req.body
        });

        if (!eventId || !name) {
            console.log('❌ Missing required fields:', { eventId, name });
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await addRSVPToSheet(eventId, name, plusOnes);

        console.log('✅ RSVP processed successfully');

        res.json({
            success: true,
            message: 'RSVP added successfully'
        });
    } catch (error) {
        console.error('❌ Error processing RSVP:', error);
        res.status(500).json({ error: 'Failed to add RSVP' });
    }
});

// Get all RSVPs (for admin view)
app.get('/api/admin/rsvps', async (req, res) => {
    try {
        const rsvps = await getAllRSVPs();
        res.json({ rsvps });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch RSVPs' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        storage: 'Google Sheets'
    });
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Initialize and start server
(async () => {
    try {
        await initializeGoogleSheets();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Using Google Sheets for storage`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
})();
