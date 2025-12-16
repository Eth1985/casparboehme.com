# 🎄 Christmas & NYE 2025 Event Site - casparboehme.com

**Minimalist event invitation website with interactive 3D ring and custom visual effects for each event.**

---

## 📅 Event Schedule (December 2025)

### December 23
1. **19:00-20:00** - Luther & Wegner Dinner @ KaDeWe, 6. Etage
2. **20:00-22:00** - Champagner BAR @ KaDeWe, 6. Etage

### December 24 (Christmas Eve)
3. **18:00-23:00** - Weihnachten & Spiele @ Studio Süd
4. **23:00-02:00** - Kupferkanne - Bier

### December 27
5. **12:00-20:00** - Sauna (Location TBD)

### December 31 (New Year's Eve)
6. **19:00-23:00** - Silvester: Buffet und Rituale @ Studio Süd
   _"Bring a dish or ritual"_
7. **23:00-05:00** - NYE Party @ Studio Süd
   _"Bring drinks & fireworks"_

---

## 🎨 Visual Art Direction

Each event has a unique visual theme when selected:

| Event | Sphere Style | Visual Effect |
|-------|--------------|---------------|
| **Event 1: Luther & Wegner** | Gold Christmas ornament | Fork & knife with Santa hat |
| **Event 2: Champagner BAR** | Champagne-colored Christmas ornament | Full-screen YouTube champagne video |
| **Event 3: Weihnachten** | Red Christmas ornament | Christmas emoji particles (🎄🎅🤶🎁⛄❄️🌟) |
| **Event 4: Kupferkanne** | Green Christmas ornament | Beer emoji particles (🍺🍻) + Kupferkanne photo background |
| **Event 5: SPA** | Neutral grey sphere | Retro sauna photo background |
| **Event 6: Silvester Buffet** | Gold sparkly NYE sphere | "Dinner for One" photo background |
| **Event 7: NYE Party** | Gold sparkly NYE sphere | Fireworks YouTube video background |

### Design Philosophy
- **Minimalist aesthetic**: Clean, sophisticated, no clutter
- **Smooth animations**: GSAP-powered transitions
- **Mobile-first**: Optimized for phone viewing (where most guests will see it)
- **Premium interactions**: Subtle haptics, elegant hover states
- **Typography-forward**: No design ego, user-centric

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** with semantic markup
- **CSS3** with modern features (grid, flexbox, animations)
- **Vanilla JavaScript** (no framework bloat)
- **Three.js** for 3D ring visualization
- **GSAP** for smooth animations

### Backend
- **Node.js** + **Express** (REST API)
- **SQLite** or **Google Sheets** for RSVP storage
- **CORS enabled** for cross-origin requests

### Deployment
- **Northflank** (Docker containers)
- **Auto-scaling** ready
- **Health checks** included
- **Database persistence** via volumes

---

## 📁 File Structure

```
casparboehme.com/
├── public/
│   ├── index.html                          # Main event page (Christmas/NYE 2025)
│   ├── index-birthday-november-2025.html   # Backup: Birthday version
│   ├── kupferkanne.jpg                     # Event 4 background (Kupferkanne bar)
│   ├── sauna-photo.jpg                     # Event 5 background (SPA)
│   ├── dinner-for-one.jpg                  # Event 6 background (Silvester Buffet)
│   ├── dinner-santa-plate.png              # Event 1 fork/knife with Santa hat
│   └── [other assets]
├── server.js                               # Express API backend
├── package.json                            # Dependencies
├── Dockerfile                              # Container configuration
├── google-credentials.json                 # Google Sheets API credentials
├── rsvps.db                                # SQLite database (if used)
└── CHRISTMAS_NYE_2025_README.md           # This file
```

---

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start server
npm start

# Open browser
open http://localhost:3000
```

### Environment Variables

Required for Google Sheets integration:

```bash
GOOGLE_CREDENTIALS_BASE64=<base64 encoded credentials>
# OR
GOOGLE_CREDENTIALS_JSON=<JSON string>
```

### Deploy to Northflank

1. Create new **Combined Service**
2. Connect GitHub repository
3. Build method: **Dockerfile**
4. Port: **3000**
5. Add environment variables (Google credentials)
6. Optional: Add volume at `/app/data` for SQLite persistence
7. Deploy!

---

## 🎯 Key Features

### Interactive 3D Ring
- **Drag to rotate**: Swipe left/right to spin the ring
- **Click to select**: Tap any colored sphere to view event details
- **Smooth animations**: GSAP-powered transitions
- **Responsive sizing**: Auto-adjusts for mobile/desktop

### Event-Specific Effects

**IMPORTANT**: Click on any colored bead to activate its event-specific visual effect!

#### Christmas Ornaments (Events 1-4)
- **Realistic 3D Christbaum Kugeln** using MeshPhysicalMaterial
- **Materials**: metalness: 1.0, roughness: 0.05, clearcoat: 1.0
- **Colors**: Gold (Event 1), Champagne (Event 2), Red (Event 3), Green (Event 4)
- **Blinking effect**: Beads blink like Christmas lights when clicked (emissive intensity pulses)
- **High reflectivity**: clearcoatRoughness: 0.1, reflectivity: 1.0, envMapIntensity: 2.0

#### NYE Sparkle (Events 6-7)
- Ultra-reflective gold material
- Glowing emissive effect
- Premium Tiffany's aesthetic

#### Interactive Backgrounds & Effects
- **YouTube videos**: Auto-play, muted, looping (Event 2: Champagne, Event 7: Fireworks)
- **Photo backgrounds**: Static, full-cover (Event 4: Kupferkanne, Event 5: SPA, Event 6: Dinner for One)
- **Emoji particles**: Continuous spawning with elegant animations (Event 3: Christmas emojis 🎄🎅🤶🎁⛄❄️🌟, Event 4: Beer emojis 🍺🍻)
- **Santa dinner plate**: Large fork & knife with Santa hat (Event 1: Luther & Wegner)

### RSVP System
- **One-tap RSVP**: Click "RSVP" button on any event
- **Simple form**: Name + plus ones
- **Real-time updates**: See who else is coming
- **Google Sheets backend**: Easy data management
- **No login required**: Boomer-friendly!

---

## 🎨 Customization Guide

### Adding New Events

Edit `public/index.html`, line ~555:

```javascript
const events = [
    {
        date: 'December 23',
        time: '19:00',
        endTime: '20:00',
        title: 'Your Event Name',
        location: 'Venue Name',
        address: 'Full Address',
        color: 0xFFD700  // Hex color for sphere
    },
    // ... more events
];
```

### Changing Visual Effects

Each event has activation/deactivation functions around line ~1440-1640:

```javascript
// Event 0: Activate dinner plate
if (index === 0) {
    activateBrunchPlate();
}

// Add your custom effect:
if (index === 0) {
    activateYourCustomEffect();
}
```

### Color Palette

#### Ring Colors
- **Inner Ring**: Dark forest green `#0B4D0B` (0x0B4D0B)
  - Material: MeshStandardMaterial with metalness: 0.8, roughness: 0.3
  - Emissive: 0x0B4D0B, emissiveIntensity: 0.15
- **Outer Ring (Segments)**: Silver metallic `#C0C0C0` (0xC0C0C0)
  - Material: MeshStandardMaterial with metalness: 0.8, roughness: 0.3
  - Transparent: true, opacity: 0.3
  - Emissive: 0xC0C0C0, emissiveIntensity: 0.1

#### Bead Colors
- **Gold Christmas** (Event 1): `0xFFD700`
- **Champagne** (Event 2): `0xF7E7CE`
- **Red Christmas** (Event 3): `0xDC143C`
- **Green Christmas** (Event 4): `0x228B22`
- **Neutral Grey** (Event 5): `0x666666`
- **Gold Sparkly NYE** (Events 6-7): `0xFFD700`

---

## 🔧 API Endpoints

### RSVP Submission
```
POST /api/rsvp
Body: {
    "event_id": "string",
    "name": "string",
    "plus_ones": number
}
```

### Admin: View All RSVPs
```
GET /api/admin/rsvps
Returns: {
    "rsvps": [
        {
            "event_id": "event-name",
            "name": "Guest Name",
            "plus_ones": 1,
            "timestamp": "2025-12-15T..."
        }
    ]
}
```

### Health Check
```
GET /health
Returns: { "status": "ok" }
```

---

## 📊 Data Storage Options

### Option 1: Google Sheets (Current)
- **Pros**: Easy to view/edit, no database setup
- **Cons**: Requires API credentials, rate limits
- **Setup**: Add `GOOGLE_CREDENTIALS_BASE64` environment variable

### Option 2: SQLite
- **Pros**: No external dependencies, fast
- **Cons**: Data lost on redeploy (unless using volumes)
- **Setup**: Comment out Google Sheets code in `server.js`

### Persistence (Northflank)
Add volume mount:
- **Mount path**: `/app/data`
- **Update code**: Change SQLite path to `/app/data/rsvps.db`
- **Result**: RSVPs persist forever

---

## 🎥 YouTube Video Integration

Two videos are embedded as full-screen backgrounds:

### Event 2: Champagner BAR
- **Video**: https://www.youtube.com/watch?v=STH3VwMJP7Q
- **Effect**: Champagne pouring/bubbles
- **Parameters**: Autoplay, muted, looping, no controls

### Event 7: NYE Party
- **Video**: https://www.youtube.com/watch?v=RfGu1THRr3U
- **Effect**: Fireworks display
- **Parameters**: Autoplay, muted, looping, no controls

**Note**: Videos auto-play only when muted (browser policy)

---

## 🐛 Troubleshooting

### Black Screen Issue
- **FIRST**: Hard refresh your browser to clear cache (Cmd + Shift + R on Mac, Ctrl + Shift + R on Windows)
- **Check**: Browser console for JavaScript errors (F12 → Console tab)
- **Check**: Three.js CDN links are loading (check Network tab)
- **Check**: index-birthday-november-2025.html still works (verify server is running)
- **Fix**: If broken, restore from working birthday version: `cp public/index-birthday-november-2025.html public/index.html`

### Changes Not Appearing
- **ALWAYS**: Do a hard refresh after making code changes (Cmd + Shift + R)
- **Check**: Server restarted after file changes (npm start should auto-reload)
- **Clear**: Browser cache completely if hard refresh doesn't work
- **Verify**: File was actually saved (check last modified timestamp)

### Background Images Not Showing
- **FIRST**: Make sure you clicked on the colored bead! Background images only appear when you activate an event.
  - Event 4 (Kupferkanne): Click green bead → kupferkanne.jpg appears
  - Event 5 (SPA): Click grey bead → sauna-photo.jpg appears
  - Event 6 (Silvester Buffet): Click gold bead → dinner-for-one.jpg appears
- **Check**: Files exist in `/public/` folder (`kupferkanne.jpg`, `sauna-photo.jpg`, `dinner-for-one.jpg`)
- **Check**: Correct file names in CSS match actual filenames
- **Check**: Server is serving static files (`app.use(express.static('public'))`)
- **Fix**: Restart server after adding images

### YouTube Videos Not Playing
- **Check**: Correct video ID in iframe `src`
- **Check**: `autoplay=1&mute=1` parameters present
- **Check**: `allow="autoplay; encrypted-media"` attribute set
- **Note**: Videos won't autoplay if not muted (browser security)

### Effects Not Stopping
- **Check**: `deactivateEvent()` function has all events (line ~1940)
- **Check**: Each event has corresponding deactivate call
- **Fix**: Ensure activation AND deactivation are wired up

### RSVP Not Saving
- **Check**: Google Sheets credentials are valid
- **Check**: Sheet ID is correct in `server.js`
- **Check**: Sheet has proper headers (Timestamp, Event, Name, Plus Ones)
- **Fallback**: Use SQLite if Google Sheets fails

---

## 📱 Mobile Optimization

### Tested Devices
- ✅ iPhone (various sizes)
- ✅ iPad
- ✅ Android phones
- ✅ Desktop browsers

### Mobile-Specific Features
- **Touch-optimized**: Larger hit areas for easier tapping
- **No scrolling**: Fixed viewport, no accidental page scroll
- **Haptic feedback**: Vibration on event selection (if supported)
- **Responsive sizing**: Ring auto-scales for screen size

### Performance
- **Smooth 60fps**: Even on older phones
- **Lazy loading**: Videos load only when needed
- **Optimized particles**: Limited count for mobile performance

---

## 🔐 Security Notes

- **No authentication**: Public event site, no login needed
- **Rate limiting**: Consider adding for RSVP endpoint (production)
- **Input validation**: Basic sanitization on RSVP form
- **CORS enabled**: Allows cross-origin requests
- **No sensitive data**: All event info is public

---

## 🎁 Credits

- **Design & Development**: Caspar Böhme + Claude Code
- **3D Framework**: Three.js
- **Animation**: GSAP (GreenSock)
- **Backend**: Node.js + Express
- **Deployment**: Northflank
- **Inspiration**: Apple minimalism, Linear polish, Stripe clarity

---

## 📝 Version History

### v2.3 - Black Screen Recovery & Ring Color Fix (Current)
- **Date**: December 16, 2025 (late afternoon session)
- **Changes**:
  - **Black Screen Recovery**: Fixed completely black localhost:3000 by restoring from working birthday version
    - Copied `index-birthday-november-2025.html` to `index.html` as clean baseline
    - Applied Christmas changes incrementally to avoid breaking code
  - **Ring Color Corrections**:
    - Inner ring: Successfully applied dark forest green (#0B4D0B) with metallic appearance
    - Outer ring: Updated to silver metallic (#C0C0C0) with matching metalness/roughness values
  - **Bead Material Documentation**: Documented MeshPhysicalMaterial specifications in README
    - clearcoat: 1.0, clearcoatRoughness: 0.1
    - metalness: 1.0, roughness: 0.05
    - reflectivity: 1.0, envMapIntensity: 2.0
  - **Browser Cache Instructions**: Added hard refresh (Cmd + Shift + R) to troubleshooting

### v2.2 - Fork/Knife Sizing Fix & Documentation Update
- **Date**: December 16, 2025 (afternoon session)
- **Changes**:
  - **Santa Dinner Plate Sizing Fix**: Fixed fork/knife too small issue
    - Changed from `35vmin` to responsive sizing: `80vw` (desktop) / `90vw` (mobile)
    - Added `max-width: 1200px` to match birthday version
    - Now properly fills screen like original birthday brunch plate
  - **Added Kupferkanne Background Image**:
    - Copied `kupferkanne.jpg` from Downloads to public folder
    - Image appears when Event 4 (Kupferkanne) bead is clicked
  - **Improved README Documentation**:
    - Added detailed MeshPhysicalMaterial specifications for beads
    - Documented dark forest green ring color (#0B4D0B)
    - Added champagne color for Event 2 bead (0xF7E7CE)
    - Clarified that background images only appear when clicking beads
    - Updated troubleshooting section with activation instructions
    - Added file structure for kupferkanne.jpg

### v2.1 - Polish & Refinement
- **Date**: December 16, 2025 (morning session)
- **Changes**:
  - **Gradient Refinement**: Enhanced green-to-gold gradient for smoother transitions
    - Events 0-2: Dark green tones
    - Event 3: Yellow-green transition
    - Events 4-6: Clear gold tones (50% coverage)
    - Event 6: Muted bronze gold for smooth wrap-around to Event 0
  - **Bead Material Upgrade**: Switched from MeshStandardMaterial to MeshPhysicalMaterial
    - Added clearcoat: 1.0 for glossy polished metal effect
    - Added clearcoatRoughness: 0.03 for near-mirror finish
    - Added reflectivity: 1.0 for metallic depth
    - Reduced emissiveIntensity to 0.1 to allow reflections to show
  - **Enhanced Lighting**: Improved lighting for metallic reflections
    - Boosted main pointLight intensity from 0.8 to 1.5
    - Added rim light at (-5, 5, 3) for metallic highlights on beads
  - **Mobile Video Coverage**: Fixed YouTube video backgrounds on vertical/mobile screens
    - Videos now use 16:9 aspect ratio calculations
    - Centered positioning with transform: translate(-50%, -50%)
    - Full coverage on portrait and landscape orientations
  - **Text Updates**:
    - Renamed "Sauna" to "SPA"
    - Changed "Kupferkanne - Bier" to "Kupferkanne"
    - Changed "Studio Süd" to "Studio 15. Stock" (all instances)

### v2.0 - Christmas & NYE 2025
- **Date**: December 15, 2025
- **Changes**:
  - Replaced birthday events with Christmas/NYE schedule
  - Added Christmas ornament sphere styling (gold/silver/red/green)
  - Added NYE sparkle sphere styling
  - Implemented Christmas emoji particles
  - Implemented beer emoji particles
  - Added sauna photo background
  - Added Dinner for One photo background
  - Replaced glitter with YouTube fireworks video
  - Fixed effect deactivation bugs
  - Improved background image positioning (static, fixed)

### v1.0 - Birthday November 2025 (Archived)
- **Date**: November 11, 2025
- **File**: `index-birthday-november-2025.html`
- **Events**: 7 birthday celebration events
- **Backup**: Available for future reuse

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Test all 7 events locally
- [ ] Verify RSVP submission works
- [ ] Check all visual effects activate/deactivate properly
- [ ] Test on mobile device
- [ ] Verify YouTube videos play
- [ ] Confirm background images are visible and static
- [ ] Add Google Sheets credentials to Northflank
- [ ] Set up database persistence (if using SQLite)
- [ ] Test production URL after deploy
- [ ] Share URL with guests via WhatsApp/iMessage

---

## 📞 Support

For issues or questions:
- **Check**: This README first
- **Check**: `WORKING_WITH_CLAUDE.md` for deployment troubleshooting
- **Check**: Server logs in Northflank dashboard

---

## 📜 License

Private event site - Not for commercial use

---

**Built with ❤️ for intimate gatherings. Designed to impress.**

**P.S.** - The interactive ring is 🔥. Your friends will love it.

---

## 🎯 Quick Reference Commands

```bash
# Development
npm start                    # Start local server
open http://localhost:3000   # Open in browser

# Production
git add .
git commit -m "message"
git push                     # Auto-deploys to Northflank

# Debugging
tail -f server.log           # View server logs
curl localhost:3000/health   # Check server status
```

---

## 📚 Content Integration Best Practices

### Learnings from Adding Videos, Images & Media

**CRITICAL RULE**: Always follow existing patterns in the codebase. Don't invent new approaches.

#### ✅ How to Add a YouTube Background Video (CORRECT WAY)

Based on successful implementation of Weihnachten video (Dec 16, 2025):

**1. Create the iframe element** (around line 829 in index.html):
```javascript
// Event X: [Event Name] - YouTube Video Background
const eventVideo = document.createElement('iframe');
eventVideo.src = 'https://www.youtube.com/embed/VIDEO_ID?start=SECONDS&autoplay=1&mute=1&loop=1&playlist=VIDEO_ID&controls=0&showinfo=0&rel=0&modestbranding=1';
eventVideo.allow = 'autoplay; encrypted-media';
eventVideo.className = 'youtube-video-bg';
eventVideo.style.width = '177.77vh';
eventVideo.style.height = '100vw';
eventVideo.setAttribute('frameborder', '0');
document.body.appendChild(eventVideo);
```

**Key parameters explained**:
- `start=76` - Start at 76 seconds (1:16)
- `autoplay=1` - Auto-play when activated
- **`mute=1`** - **REQUIRED** for autoplay to work (browsers block unmuted autoplay)
- `loop=1` - Loop the video
- `playlist=VIDEO_ID` - Required for looping to work
- `controls=0` - Hide YouTube controls
- `showinfo=0` - Hide video title
- `rel=0` - Don't show related videos
- `modestbranding=1` - Minimal YouTube branding

**2. Add activate/deactivate functions** (right after the iframe creation):
```javascript
let eventVideoActive = false;

function activateEventVideo() {
    eventVideoActive = true;
    eventVideo.classList.add('active');
    console.log('🎬 Event video activated');
}

function deactivateEventVideo() {
    eventVideoActive = false;
    eventVideo.classList.remove('active');
    console.log('🎬 Event video deactivated');
}
```

**3. Hook into event click handler** (around line 1221):
```javascript
if (index === 2) {  // Event index (0-based)
    activateEventVideo();
}
```

**4. Hook into event deactivation** (two places around lines 1127 and 1282):
```javascript
if (currentActive === 2) {
    deactivateEventVideo();
}
```

#### ❌ WRONG APPROACHES (Don't Do This)

**DON'T** try to add videos via event properties:
```javascript
// ❌ WRONG - This doesn't follow the existing pattern
{
  date: 'December 24',
  title: 'Event',
  youtubeUrl: 'https://youtube.com/...'  // Don't add custom properties
}
```

**DON'T** try to embed videos in the RSVP modal:
```javascript
// ❌ WRONG - Videos should be full-screen backgrounds, not modal embeds
if (event.youtubeUrl) {
    timeHTML += `<iframe...>`;  // This breaks the design pattern
}
```

**WHY**: The site follows a consistent pattern where all media (videos, images, emojis) are **full-screen background effects** activated by clicking an event bead, not embedded content in the modal.

#### Adding Static Images as Backgrounds

**Pattern**: Follow the Kupferkanne photo example (around line 916):

```javascript
// 1. Add CSS class for the background
.kupferkanne-photo-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('kupferkanne.jpg');
    background-size: cover;
    background-position: center;
    opacity: 0;
    pointer-events: none;
    z-index: -1;
    transition: opacity 0.8s ease;
}

.kupferkanne-photo-bg.active {
    opacity: 0.4;  // Subtle background opacity
}

// 2. Create the element in JavaScript
const kupferkannePhoto = document.createElement('div');
kupferkannePhoto.className = 'kupferkanne-photo-bg';
document.body.appendChild(kupferkannePhoto);

// 3. Add activate/deactivate functions
function activateKupferkanne() {
    kupferkannePhoto.classList.add('active');
}

function deactivateKupferkanne() {
    kupferkannePhoto.classList.remove('active');
}
```

#### Adding Emoji/Particle Effects

**Pattern**: Follow the Christmas emoji example (around line 859):

```javascript
// 1. Define emoji array
const eventEmojis = ['🎄', '🎅', '🤶', '🎁'];

// 2. Create emoji creation function
function createEventEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.textContent = eventEmojis[Math.floor(Math.random() * eventEmojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.animationDuration = (Math.random() * 3 + 4) + 's';
    emoji.style.fontSize = (Math.random() * 30 + 40) + 'px';
    document.body.appendChild(emoji);

    setTimeout(() => emoji.remove(), 8000);
}

// 3. Create activate/deactivate functions
let emojiInterval = null;

function activateEventEmojis() {
    if (emojiInterval) return;
    emojiInterval = setInterval(() => {
        createEventEmoji();
        createEventEmoji();
    }, 500);
}

function deactivateEventEmojis() {
    if (emojiInterval) {
        clearInterval(emojiInterval);
        emojiInterval = null;
    }
}
```

### General Content Integration Principles

1. **Always inspect the codebase first** - Look for similar content (videos, images) already implemented
2. **Follow the established pattern exactly** - Don't try to "improve" or "simplify" the pattern
3. **Test locally before deploying** - YouTube videos especially need testing (autoplay, mute, etc.)
4. **Full-screen backgrounds only** - No inline content in modals or beads
5. **Activation/deactivation lifecycle** - All content must cleanly activate and deactivate
6. **Mobile-first** - Test on phone viewport (where guests will actually view it)
7. **Performance matters** - Heavy videos/images should lazy-load and clean up properly

### Common Gotchas

- **YouTube autoplay requires mute** - Without `&mute=1`, videos won't autoplay
- **YouTube loop requires playlist parameter** - `&loop=1&playlist=VIDEO_ID`
- **Z-index layering** - Background effects use `z-index: -1`, modals use higher values
- **Event indices are 0-based** - First event is index 0, not 1
- **CSS class naming** - Use descriptive names like `weihnachten-video-bg`, not generic `video-1`

### File Locations Reference

- **Event definitions**: Line ~600 in `public/index.html`
- **Background video setup**: Line ~806-851 in `public/index.html`
- **Event activation hooks**: Line ~1217-1230 in `public/index.html`
- **Event deactivation hooks**: Lines ~1122-1140 and ~1277-1295 in `public/index.html`
- **Static images**: `/public/` directory (e.g., `kupferkanne.jpg`)
- **CSS for backgrounds**: Line ~169-189 in `public/index.html` (in `<style>` tag)

---

**Last Updated**: December 16, 2025 (late afternoon - added content integration guide)
**Version**: 2.4 (YouTube Video Integration + Documentation)
**Status**: ✅ Production Ready
