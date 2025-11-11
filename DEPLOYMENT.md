# Quick Northflank Deployment Guide

## Files You Have

✅ `server.js` - Backend API  
✅ `package.json` - Dependencies  
✅ `Dockerfile` - Container config  
✅ `public/index.html` - Your beautiful frontend  

## Deploy to Northflank (5 minutes)

### Step 1: Create a new service

1. Log into Northflank
2. Go to your project
3. Click **"Add Service"** → **"Combined Service"**

### Step 2: Upload your code

**Option A: Via Git (Recommended)**
- Push these files to a GitHub/GitLab repo
- In Northflank, connect the repo
- Select branch: `main`

**Option B: Direct Upload**
- Zip these files: `server.js`, `package.json`, `Dockerfile`, `public/`
- Upload to Northflank

### Step 3: Configure build

- **Build method**: Dockerfile
- **Dockerfile path**: `./Dockerfile`
- **Port**: `3000`

### Step 4: Deploy

Click **"Create and Deploy"**

Wait ~2 minutes. Done! 🚀

## Your URL

Northflank will give you a URL like:
```
https://your-service-xxxx.northflank.app
```

Share this via WhatsApp/iMessage. Works on all devices instantly.

## Make Database Persistent (Optional but Recommended)

By default, RSVPs reset when service restarts. To keep them:

1. In Northflank, go to your service
2. Add **Volume**:
   - Name: `sqlite-data`
   - Mount path: `/app/data`
   - Size: 1GB (more than enough)

3. Update `server.js` line 13:
```javascript
const db = new sqlite3.Database('/app/data/rsvps.db', (err) => {
```

4. Redeploy

Now RSVPs persist forever!

## View RSVPs (Admin Panel)

Visit: `https://your-url.northflank.app/api/admin/rsvps`

You'll see JSON with all RSVPs:
```json
{
  "rsvps": [
    {
      "event_id": "bowling",
      "name": "Max",
      "plus_ones": 1,
      "created_at": "2025-11-09T..."
    }
  ]
}
```

## Custom Domain (Optional)

Want `invite.caspar.com` instead of Northflank URL?

1. In Northflank → Networking → Add Domain
2. Add your domain
3. Update DNS (they'll show you what records to add)

## Troubleshooting

**Service won't start?**
- Check logs in Northflank dashboard
- Usually means port mismatch (make sure it's 3000)

**RSVPs not saving?**
- Check Network tab in browser dev tools
- API calls should go to your Northflank URL, not localhost

**Images not loading?**
- Unsplash has rate limits (rare issue)
- Replace with your own hosted images if needed

## That's It!

You now have a production-grade event invite that:
- ✅ Looks stunning on mobile
- ✅ Saves RSVPs to database
- ✅ Shows live attendee lists
- ✅ Costs ~$0/month (Northflank free tier handles this easily)

Share the link and watch RSVPs roll in! 🎉
