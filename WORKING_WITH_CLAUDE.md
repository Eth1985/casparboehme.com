# Working with Claude - Accountability Standards

## Time Estimates

**NEVER underestimate deployment time.** Real-world timing:

- "2 minute fix" = Actually 30-60 minutes (coding + git + deploy + verification)
- Database migration = 1+ hours minimum
- "Quick change" to production = Plan for 1 hour minimum

**Always account for:**
- Git commit/push time: 5 min
- Northflank deployment: 5-10 min
- Environment variable changes: 10-15 min (requires restart)
- Testing in production: 10-20 min
- Unexpected issues: 30+ min buffer

## Safety Checks - MANDATORY

**Before ANY production deployment:**

1. **Test locally first** - Always test on localhost:3000 before pushing
2. **Check environment variables** - Verify all required vars exist in Northflank
3. **Have rollback plan** - Know the last working commit hash
4. **Test critical paths** - RSVP submission, data persistence, API endpoints
5. **Validate data integrity** - Check database/sheet has correct structure

**For RSVP system specifically:**
- Test full RSVP flow: click event → fill form → submit → verify in Google Sheet
- Check button states reset correctly
- Verify timestamps, names, event IDs all save
- Test with different events (not just one)

## Production Readiness Checklist

Never deploy without checking:

- [ ] Local testing complete (5-10 min)
- [ ] Environment variables documented and set
- [ ] Error logging added to critical functions
- [ ] Success/failure states clearly handled
- [ ] User feedback mechanisms work (button states, messages)
- [ ] Data persistence verified (read back from database/sheet)
- [ ] Last working commit documented for rollback

## Accountability

**When things break:**

1. State facts clearly - what broke, when, why
2. Give realistic fix timeline (err on the side of overestimating)
3. Implement monitoring/logging to prevent recurrence
4. Update this document with lessons learned

**No excuses. No false optimism. Just accurate information.**

## Recent Incidents

### Nov 11, 2025 - RSVP System Failure
- **Problem**: Button stuck in "LOCKED IN" state, blocking all registrations
- **Estimated fix time**: "1-2 minutes"
- **Actual time**: 60+ minutes
- **Root causes**:
  1. No local testing before production push
  2. No reset mechanism for button state
  3. Missing environment variable verification
  4. Optimistic time estimate
- **Prevention**:
  - Added button state reset in `openRSVPModal()`
  - Added comprehensive logging to server.js
  - This document created
  - **RULE**: Always test RSVP flow locally before deploying

## Working Principles

1. **Accuracy over speed** - Better to say "this will take 2 hours" and finish in 1 than say "5 minutes" and take 90
2. **Test in production-like conditions** - localhost:3000 with real Google Sheets
3. **Add logging before deploying** - If you can't see what's happening, you can't debug
4. **Document environment dependencies** - Any ENV var required should be in README
5. **One change at a time** - Don't bundle multiple features in one deploy

## Time Estimate Guidelines

**Realistic estimates for common tasks:**

| Task | Estimate | Why |
|------|----------|-----|
| CSS change | 30 min | Code + test + deploy + verify |
| Add logging | 20 min | Code + test + deploy |
| Fix button state | 45 min | Code + test + deploy + verify in production |
| Database schema change | 2 hours | Migration + test + rollback plan + deploy |
| New API endpoint | 1 hour | Code + test + error handling + deploy |
| Environment variable change | 30 min | Set var + restart + verify + test |

**If in doubt, double the estimate.**

## Emergency Protocols

**If production is down:**

1. State clearly: "Production is down. Estimated fix time: X hours"
2. Get last working commit: `git log --oneline | head -5`
3. Rollback option: `git revert [commit-hash]`
4. Focus on restoration first, root cause analysis second
5. Communicate every 15 minutes with status updates

**Never say "almost done" or "just a minute" during an outage.**
