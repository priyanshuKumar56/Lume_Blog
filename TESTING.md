# Testing Guide

## Testing Strategy

### Unit Tests
- Validation schemas
- Utility functions (slug generation, readability)
- Error handling

### Integration Tests
- Authentication flow
- Post CRUD operations
- Comment system
- Analytics tracking

### E2E Tests
- User registration to post creation
- Admin dashboard operations
- Content discovery

## Running Tests

### Setup
```bash
npm install --save-dev vitest @testing-library/react jsdom
```

### Run Tests
```bash
npm run test
npm run test:watch
npm run test:coverage
```

## Key Test Cases

### Authentication
- [ ] Register with valid email
- [ ] Login with correct password
- [ ] Reject login with wrong password
- [ ] Token refresh
- [ ] Token expiration

### Posts
- [ ] Create post as author
- [ ] Reject post creation for non-authors
- [ ] Edit own post
- [ ] Cannot edit others' posts
- [ ] Publish draft post

### Comments
- [ ] Add comment to post
- [ ] Nest replies
- [ ] Delete own comment
- [ ] Admin can moderate comments

---

See `__tests__` directory for test files.
