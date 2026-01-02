# Deployment Guide

## Production Checklist

### Pre-Deployment
- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] SSL certificate configured
- [ ] Domain connected
- [ ] Analytics initialized

### Security Checks
- [ ] JWT secrets are strong (min 32 chars)
- [ ] No credentials in code
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] HTTPS enforced

### SEO Setup
- [ ] Google Search Console connected
- [ ] Robots.txt configured
- [ ] Sitemap generation tested
- [ ] Structured data validated (schema.org)
- [ ] Core Web Vitals optimized

### Performance
- [ ] Images optimized (WebP/AVIF)
- [ ] ISR revalidation times set
- [ ] Database indexes created
- [ ] CDN configured
- [ ] Lighthouse score > 90

## Vercel Deployment Steps

### Step 1: Connect Repository
```bash
vercel login
vercel link
```

### Step 2: Configure Environment
```bash
vercel env pull
# Edit .env.local with production values
vercel env add DATABASE_URL <your_neon_url>
vercel env add JWT_SECRET <strong_random_key>
vercel env add JWT_REFRESH_SECRET <strong_random_key>
vercel env add NEXT_PUBLIC_APP_URL https://yourdomain.com
```

### Step 3: Run Database Migrations
```bash
# Connect to Neon console
# Run scripts/01-schema.sql
# Run scripts/02-schema-migration.sql
```

### Step 4: Deploy
```bash
vercel deploy --prod
```

### Step 5: Verify
- Check deployment logs
- Test critical user journeys
- Verify SEO pages render correctly
- Monitor Core Web Vitals

## Post-Deployment

### Monitor Metrics
1. **Performance**: Check Vercel Analytics
2. **Errors**: Set up error tracking (Sentry)
3. **SEO**: Monitor Google Search Console
4. **Users**: Track analytics events

### Database Backup
```bash
# Neon automatic backups enabled
# Schedule weekly manual backups
pg_dump postgresql://user:pass@host/db > backup.sql
```

### Update DNS
```
A Record: yourdomain.com -> Vercel IP
CNAME: www.yourdomain.com -> cname.vercel-dns.com
```

### Enable HTTPS
- Vercel handles SSL automatically
- Verify HSTS header is set
- Force HTTPS redirect

## Scaling Plan

### Phase 1: 100K DAU
- Current setup sufficient
- Monitor database performance
- Enable query caching

### Phase 2: 1L DAU
- Add Neon read replicas
- Implement Redis caching
- Increase ISR revalidation

### Phase 3: 10L+ DAU
- Elasticsearch for search
- Distributed caching (Upstash)
- CDN optimization
- Database sharding ready

## Troubleshooting

### Database Connection Fails
```bash
# Check DATABASE_URL format
# Verify Neon IP whitelist
# Test connection locally
psql $DATABASE_URL -c "SELECT 1"
```

### JWT Errors
- Verify JWT secrets are set
- Check token expiration
- Validate refresh token flow

### Images Not Loading
- Verify Cloudinary credentials (if using)
- Check image URLs are accessible
- Ensure alt text is present

### Performance Issues
- Check database query performance
- Review ISR revalidation times
- Analyze bundle size with `next/analyze`

## Rollback Procedure

```bash
# Revert to previous deployment
vercel rollback

# Or deploy specific commit
vercel deploy <commit-hash>
```

---

**Contact**: support@yourdomain.com
```

```typescript file="" isHidden
