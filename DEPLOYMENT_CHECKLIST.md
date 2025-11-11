# Deployment Checklist

**NEVER skip these steps before deploying to production.**

## Pre-Deployment (30-45 min minimum)

### 1. Local Testing (15 min)
- [ ] `npm start` runs without errors
- [ ] Website loads at http://localhost:3000
- [ ] All 7 events display correctly
- [ ] RSVP modal opens for each event
- [ ] Form validation works (empty name shows error)
- [ ] Submit RSVP with test data
- [ ] Verify data appears in Google Sheet (check timestamp, event, name, plus_ones)
- [ ] Test button resets correctly after submission
- [ ] Test multiple RSVPs (different events)

### 2. Environment Variables (10 min)
- [ ] Check `server.js` for required environment variables
- [ ] Verify `GOOGLE_CREDENTIALS_JSON` is set in Northflank
- [ ] Confirm Google Sheet ID is correct: `1xEM31bGm3TH564wIxlgPS4f4BfEgk4dsPSpyxwZE_rY`
- [ ] Check service account has Editor access to sheet

### 3. Code Review (10 min)
- [ ] All console.log statements are helpful (not spam)
- [ ] Error handling catches all failure cases
- [ ] Loading/disabled states prevent duplicate submissions
- [ ] Success/failure messages are clear to users
- [ ] No hardcoded localhost URLs in production code

## Deployment (15-20 min)

### 4. Git Commit
```bash
git status                    # Review changes
git add -A                    # Stage all changes
git commit -m "descriptive message"
git push                      # Push to GitHub
```

### 5. Monitor Northflank Deploy (10-15 min)
- [ ] Watch deployment logs in Northflank dashboard
- [ ] Wait for "Deployment successful" status
- [ ] Check for any error messages in logs
- [ ] Verify service is "Running"

## Post-Deployment Verification (15-20 min)

### 6. Production Smoke Test
- [ ] Visit https://casparboehme.com
- [ ] Hard refresh (Cmd+Shift+R) to clear cache
- [ ] Click on an event
- [ ] Open RSVP modal
- [ ] Fill in test RSVP (use "TEST" in name so you can find it)
- [ ] Submit form
- [ ] Check Google Sheet - verify TEST entry appears with all fields
- [ ] Delete test entry from sheet

### 7. Monitor for Issues (20 min after deploy)
- [ ] Check Northflank logs for errors
- [ ] Check Google Sheet for new RSVPs
- [ ] Wait 15-20 minutes to see if users report issues

## Rollback Plan

If production is broken:

```bash
git log --oneline | head -5        # Find last working commit
git revert [bad-commit-hash]       # Revert the broken commit
git push                           # Deploy rollback
```

**Document last known working commit:** `fa8cd6f`

## Time Estimate

**Total minimum time for safe deployment: 60-90 minutes**

- Pre-deployment testing: 30-45 min
- Deployment: 15-20 min
- Post-deployment verification: 15-20 min
- Buffer for issues: 30 min

**Never say "this will take 5 minutes" for a production deploy.**
