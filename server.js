const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize SQLite database
const db = new sqlite3.Database('./rsvps.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Database connected');
        initializeDatabase();
    }
});

// Create tables
function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS rsvps (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_id TEXT NOT NULL,
            name TEXT NOT NULL,
            plus_ones INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

// API Routes

// Get all RSVPs for an event
app.get('/api/rsvps/:eventId', (req, res) => {
    const { eventId } = req.params;
    
    db.all(
        'SELECT id, name, plus_ones FROM rsvps WHERE event_id = ? ORDER BY created_at DESC',
        [eventId],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ attendees: rows });
        }
    );
});

// Add RSVP
app.post('/api/rsvps', (req, res) => {
    const { eventId, name, plusOnes } = req.body;
    
    if (!eventId || !name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    db.run(
        'INSERT INTO rsvps (event_id, name, plus_ones) VALUES (?, ?, ?)',
        [eventId, name, plusOnes || 0],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ 
                success: true, 
                id: this.lastID,
                message: 'RSVP added successfully'
            });
        }
    );
});

// Delete RSVP (optional - for admin)
app.delete('/api/rsvps/:id', (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM rsvps WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ success: true, message: 'RSVP deleted' });
    });
});

// Get all RSVPs (for admin view)
app.get('/api/admin/rsvps', (req, res) => {
    db.all(
        'SELECT event_id, name, plus_ones, created_at FROM rsvps ORDER BY created_at DESC',
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({ rsvps: rows });
        }
    );
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connection closed');
        process.exit(0);
    });
});
