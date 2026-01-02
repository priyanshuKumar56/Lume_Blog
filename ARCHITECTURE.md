# Architecture Overview

## System Design

### Frontend Layer
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with shadcn/ui
- **State Management**: SWR for data fetching
- **Rendering**: SSG/ISR for blog pages, CSR for admin

### Backend Layer
- **Framework**: Next.js API Routes (Serverless)
- **Authentication**: JWT (access + refresh tokens)
- **Validation**: Zod schemas
- **Error Handling**: Centralized error middleware

### Database Layer
- **Database**: PostgreSQL (Neon serverless)
- **Connection**: Serverless client via @neondatabase/serverless
- **Connection Pooling**: Neon built-in pooling
- **Optimization**: Indexed queries, full-text search

### Infrastructure
- **Hosting**: Vercel (Frontend + API)
- **CDN**: Vercel Edge Network
- **Database**: Neon Tech (Serverless PostgreSQL)
- **Images**: Cloudinary (optional, recommended)

## Data Flow

### Authentication Flow
```
User Input → Login API → Password Validation (bcrypt) 
→ JWT Generation → Token Storage (HttpOnly cookie) 
→ API Requests (Token in header) → Token Validation
```

### Blog Post Creation Flow
```
Author → Dashboard → Post Editor → Rich Content (JSON blocks)
→ Save Draft → Upload Images → SEO Settings 
→ Preview → Publish → Database → ISR Revalidation
```

### Content Discovery Flow
```
User → Homepage → Blog Grid (ISR cached)
→ Full-Text Search → Related Posts 
→ Popular Posts → Category Browsing
```

## Performance Optimizations

### Frontend
- **ISR**: 60-300s revalidation for blog pages
- **Image Optimization**: WebP/AVIF with CDN
- **Code Splitting**: Automatic route splitting
- **Font Optimization**: system-ui font stack
- **Compression**: Brotli + gzip

### Backend
- **Database Indexing**: slug, published_at, author_id, full-text search
- **Query Optimization**: N+1 prevention, efficient JOINs
- **Caching**: ISR for static content, Redis ready
- **Rate Limiting**: In-memory store (upgradeable to Redis)

### Database
- **Connection Pooling**: Neon handles auto-scaling
- **Read Replicas**: Available for high traffic
- **Backup**: Automated daily backups
- **Replication**: Real-time for disaster recovery

## Security Architecture

### Authentication & Authorization
```
Login → JWT Token (short-lived, 15m)
       ↓
API Request with Token
       ↓
Token Validation
       ↓
Role Check (Admin/Editor/Author/Reader)
       ↓
Resource Access
       ↓
Refresh Token (7 days) for renewal
```

### Data Protection
- **Passwords**: bcrypt hashing (10 rounds)
- **Tokens**: Signed JWT with HS256
- **Transport**: HTTPS only
- **Storage**: HttpOnly, Secure, SameSite cookies
- **CORS**: Strict origin validation

### Input Validation
- **All endpoints**: Zod schema validation
- **SQL Injection**: Parameterized queries
- **XSS Prevention**: Content sanitization
- **Rate Limiting**: Per-IP limiting

## Scalability Plan

### Current (10K-100K DAU)
- Single Neon database instance
- Vercel edge caching
- In-memory rate limiting

### Growth Phase (100K-1M DAU)
- Neon read replicas
- Redis for caching (likes, comments)
- Elasticsearch for full-text search
- CDN image optimization

### Enterprise (1M+ DAU)
- Database sharding by author
- Distributed caching
- Message queue for analytics
- Separate analytics database

## Monitoring & Observability

### Metrics to Track
1. **Performance**: Core Web Vitals (LCP, FID, CLS)
2. **Reliability**: Error rates, uptime percentage
3. **Business**: Daily active users, post views, engagement
4. **Technical**: API response times, database query times

### Tools (Ready to Integrate)
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics 4
- **Performance**: Vercel Analytics, Lighthouse CI
- **Logs**: Vercel logs, structured logging

## Deployment Architecture

```
Local Development
    ↓
GitHub Repository
    ↓
Vercel CI/CD
    ↓
Build & Test
    ↓
Database Migrations (if needed)
    ↓
Deploy to Edge
    ↓
Monitor & Rollback (if needed)
```

---

For deployment guide, see [DEPLOYMENT.md](./DEPLOYMENT.md)
