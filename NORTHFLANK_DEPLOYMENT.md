# Deploying casparboehme.com to Northflank

## Step 1: Push to GitHub

1. Go to https://github.com/new
2. Create a new repository named `casparboehme.com`
3. Make it **Public** or **Private**
4. Do NOT initialize with README (we already have code)

Then run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/casparboehme.com.git
git branch -M main
git push -u origin main
```

## Step 2: Create Northflank Service

1. Log in to Northflank: https://app.northflank.com
2. Select your project (or create one: "caspar-website")
3. Click **"Create Service"** → **"Combined Service"**

### Service Configuration:

**Build Settings:**
- **Name**: `casparboehme-com`
- **Repository**: Connect your GitHub account and select `casparboehme.com`
- **Branch**: `main`
- **Build Type**: `Dockerfile`
- **Dockerfile Path**: `Dockerfile` (default)

**Deployment Settings:**
- **Port**: `3000`
- **Health Check Path**: `/health`
- **Replicas**: 1 (can scale up later)
- **Resources**:
  - CPU: 0.2 vCPU (minimum)
  - Memory: 512 MB (minimum)

**Environment Variables:**
None needed (using defaults)

**Volumes (IMPORTANT for SQLite):**
- Click **"Add Volume"**
- **Mount Path**: `/app/data`
- **Size**: 1 GB (for RSVPs database)
- This ensures your SQLite database persists across deployments

## Step 3: Configure Custom Domain

After service is deployed:

1. Go to your service → **"Networking"** tab
2. Click **"Add Domain"**
3. Add domain: `casparboehme.com`
4. Northflank will show you DNS records to add

### DNS Configuration (at your domain registrar):

Add these records:

**For casparboehme.com:**
```
Type: A
Name: @
Value: [Northflank IP - shown in dashboard]
TTL: 300
```

**For www.casparboehme.com:**
```
Type: CNAME
Name: www
Value: [Your Northflank service URL]
TTL: 300
```

**SSL Certificate:**
- Northflank auto-provisions Let's Encrypt SSL
- Usually ready within 5-10 minutes after DNS propagates

## Step 4: Update Server for Database Persistence

The Dockerfile already creates `/app/data` but we need to update server.js to use it:

**Current:** `./rsvps.db`
**Change to:** `/app/data/rsvps.db`

This ensures the database is stored in the persistent volume.

## Step 5: Deploy!

1. Northflank will automatically deploy when you push to `main`
2. Watch build logs in Northflank dashboard
3. Once deployed, visit: `https://casparboehme.com`

## Monitoring

**Health Check:** `https://casparboehme.com/health`
Should return: `{"status":"ok","timestamp":"..."}`

**Admin RSVP View:** `https://casparboehme.com/admin-rsvps.html`
View all RSVPs submitted

## Continuous Deployment

Every time you push to `main` branch, Northflank will:
1. Build new Docker image
2. Run health check
3. Deploy with zero downtime
4. Preserve SQLite database (in mounted volume)

---

## Quick Commands

```bash
# Make changes to code
git add .
git commit -m "Update: description of changes"
git push

# Northflank automatically deploys!
```

## Troubleshooting

**Build fails:**
- Check build logs in Northflank
- Ensure Dockerfile is valid
- Verify all dependencies in package.json

**Database issues:**
- Ensure volume is mounted at `/app/data`
- Check server.js uses `/app/data/rsvps.db`
- Volume persists across deployments

**Domain not working:**
- DNS can take 5-60 minutes to propagate
- Verify DNS records with: `dig casparboehme.com`
- SSL cert auto-provisions after DNS is correct

**Service won't start:**
- Check health check endpoint returns 200
- Verify port 3000 is exposed
- Review application logs in Northflank
