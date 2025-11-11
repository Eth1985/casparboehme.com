# ✅ QUICK START CHECKLIST

## What's Included

📦 **caspar-invite-complete.tar.gz** (everything in one file)

OR use individual files:

- ✅ `server.js` - Backend
- ✅ `package.json` - Dependencies  
- ✅ `Dockerfile` - Container
- ✅ `public/index.html` - Frontend
- ✅ `DEPLOYMENT.md` - Deploy guide
- ✅ `README.md` - Full documentation

## Deploy in 3 Steps

### 1️⃣ Upload to Northflank
- Create new Combined Service
- Upload files (or connect Git repo)
- Build method: **Dockerfile**
- Port: **3000**

### 2️⃣ Deploy
- Click "Create and Deploy"
- Wait 2 minutes
- Get your URL

### 3️⃣ Share
- Copy URL from Northflank
- Send via WhatsApp/iMessage
- Done! 🎉

## Test Locally First (Optional)

```bash
# Extract archive
tar -xzf caspar-invite-complete.tar.gz
cd caspar-invite-complete

# Install & run
npm install
npm start

# Visit: http://localhost:3000
```

## What Your Friends Will See

1. **Landing page**: Beautiful circular layout with 7 events
2. **Tap event**: Smooth transition to RSVP page
3. **Fill form**: Name + plus ones
4. **Submit**: See who else is coming
5. **Done**: They're on the list!

## What You'll See

Admin panel at: `https://your-url/api/admin/rsvps`

Returns JSON like:
```json
{
  "rsvps": [
    {"event_id": "bowling", "name": "Max", "plus_ones": 1},
    {"event_id": "brunch", "name": "Lisa", "plus_ones": 0}
  ]
}
```

## Database Persistence

**Default**: RSVPs stored in SQLite (may reset on redeploy)

**Recommended**: Add Northflank volume
- Mount: `/app/data`
- Update server.js line 13 to use `/app/data/rsvps.db`
- RSVPs persist forever

## Support

Everything works out of the box. If something breaks:
1. Check Northflank logs
2. Verify port is 3000
3. Make sure Dockerfile is being used

## Preview Before Deploy

Open `preview.html` in your browser to see the design (RSVPs won't work without backend).

---

**Time to deploy: ~5 minutes**
**Cost: Free (Northflank free tier)**
**Maintenance: Zero**

Ready? Let's go! 🚀
