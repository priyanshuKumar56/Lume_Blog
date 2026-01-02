# Production-Ready Blog Platform

A complete, serverless blogging platform built with Next.js 16, PostgreSQL, and JWT authentication. Features SEO optimization, role-based access control, comments, and a full admin dashboard.

## Features

- **Authentication**: JWT-based with secure refresh tokens
- **Serverless Backend**: All API routes run on edge/serverless
- **Database**: PostgreSQL with Neon serverless
- **Role-Based Access**: Admin, Editor, Author, Reader roles
- **Blog Features**: Posts, comments, likes, categories, tags
- **SEO Optimized**: Meta tags, OpenGraph, sitemaps, canonical URLs
- **Admin Dashboard**: User management, post approval, category management
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)
- Vercel account (optional, for deployment)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your database URL and JWT secrets

5. Run the database migration:
```bash
# Create tables in your PostgreSQL database using scripts/01-schema.sql
```

6. Start development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the blog.

## Deployment

### To Vercel
```bash
vercel
```

### To any Node.js host
1. Build: `npm run build`
2. Start: `npm start`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token

### Blog
- `GET /api/posts` - Get all published posts (paginated)
- `GET /api/posts/:slug` - Get single post
- `POST /api/posts/create` - Create new post (authenticated)
- `PUT /api/posts/:id/update` - Update post (authenticated)
- `DELETE /api/posts/:id` - Delete post (authenticated)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug/posts` - Get posts by category

### Comments
- `GET /api/comments?postId=:postId` - Get post comments
- `POST /api/comments` - Create comment (authenticated)
- `DELETE /api/comments/:id` - Delete comment (authenticated)

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `GET /api/admin/posts` - Get all posts
- `PUT /api/admin/posts/:id/publish` - Publish post

## Database Schema

See `scripts/01-schema.sql` for the complete schema including:
- Users with roles
- Posts with SEO metadata
- Categories and Tags
- Comments system
- Post likes
- Optimized indexes for performance

## Security

- Passwords hashed with bcrypt
- JWT tokens with short expiration (15 min access, 7 day refresh)
- HttpOnly cookies for token storage
- CORS configured for security
- Role-based access control on all protected routes
- Input validation with Zod schemas

## Performance

- ISR (Incremental Static Regeneration) for blog pages
- Database connection pooling via Neon
- Optimized SQL queries with indexes
- Image optimization with Next.js Image component
- Minified CSS/JS with Tailwind v4 and esbuild

## License

MIT
