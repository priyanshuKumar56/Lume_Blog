-- Add missing tables and indexes for SEO-first architecture

-- Create page_views table for analytics
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  ip_hash VARCHAR(64) NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  read_time INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(post_id, ip_hash, DATE(created_at))
);

CREATE INDEX IF NOT EXISTS idx_page_views_post_id ON page_views(post_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);

-- Add SEO fields to posts if not exists
ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_title VARCHAR(60);
ALTER TABLE posts ADD COLUMN IF NOT EXISTS seo_description VARCHAR(160);
ALTER TABLE posts ADD COLUMN IF NOT EXISTS canonical_url VARCHAR(500);
ALTER TABLE posts ADD COLUMN IF NOT EXISTS banner_image_id VARCHAR(500);
ALTER TABLE posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Create images table for image SEO management
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  alt_text VARCHAR(125) NOT NULL,
  title VARCHAR(100),
  caption TEXT,
  width INT,
  height INT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_images_uploaded_by ON images(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_images_created_at ON images(created_at DESC);

-- Add full-text search indexes
CREATE INDEX IF NOT EXISTS idx_posts_search ON posts USING GIN(to_tsvector('english', title || ' ' || excerpt));
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published_at DESC) WHERE status = 'PUBLISHED';
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Create post_categories junction table if not exists
CREATE TABLE IF NOT EXISTS post_categories (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

CREATE INDEX IF NOT EXISTS idx_post_categories_post ON post_categories(post_id);
CREATE INDEX IF NOT EXISTS idx_post_categories_category ON post_categories(category_id);
