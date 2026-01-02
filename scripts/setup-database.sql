-- Database Setup Script for Blog Application
-- Run this script in your Neon database console to set up the database schema

-- First, run the main schema
-- Then run the migration script

-- You can run these commands in your Neon dashboard SQL editor:

-- 1. Create main schema (copy contents of scripts/01-schema.sql)
-- 2. Run migration (copy contents of scripts/02-schema-migration.sql)

-- After setting up the schema, you can insert sample data to test:

-- Sample User (for testing)
INSERT INTO users (id, name, email, password_hash, role) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Test Author', 'author@test.com', '$2b$10$example.hash.here', 'AUTHOR')
ON CONFLICT (email) DO NOTHING;

-- Sample Categories
INSERT INTO categories (name, slug, description) VALUES 
('Technology', 'technology', 'Articles about technology and programming'),
('Design', 'design', 'Design principles and UI/UX articles'),
('Business', 'business', 'Business insights and strategies')
ON CONFLICT (name) DO NOTHING;

-- Sample Tags
INSERT INTO tags (name, slug) VALUES 
('javascript', 'javascript'),
('react', 'react'),
('nextjs', 'nextjs'),
('design', 'design'),
('startup', 'startup')
ON CONFLICT (name) DO NOTHING;

-- Sample Post (for testing)
INSERT INTO posts (
  id, title, slug, excerpt, content, author_id, status, seo_title, seo_description, view_count, published_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'Getting Started with Next.js and TypeScript',
  'getting-started-nextjs-typescript',
  'Learn how to build modern web applications with Next.js and TypeScript.',
  '{"blocks": [{"id": "intro", "type": "paragraph", "content": "Next.js is a powerful React framework that enables server-side rendering and static site generation."}]}',
  '550e8400-e29b-41d4-a716-446655440000',
  'PUBLISHED',
  'Getting Started with Next.js and TypeScript - Complete Guide',
  'Learn how to build modern web applications with Next.js and TypeScript in this comprehensive tutorial.',
  42,
  NOW()
) ON CONFLICT (slug) DO NOTHING;

-- Link post to categories
INSERT INTO post_categories (post_id, category_id) 
SELECT p.id, c.id 
FROM posts p, categories c 
WHERE p.slug = 'getting-started-nextjs-typescript' 
AND c.name IN ('Technology')
ON CONFLICT DO NOTHING;

-- Link post to tags
INSERT INTO post_tags (post_id, tag_id) 
SELECT p.id, t.id 
FROM posts p, tags t 
WHERE p.slug = 'getting-started-nextjs-typescript' 
AND t.name IN ('nextjs', 'react', 'typescript')
ON CONFLICT DO NOTHING;
