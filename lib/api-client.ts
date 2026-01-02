// Client-side API utilities
export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "API call failed")
  }

  return response.json()
}

export async function login(email: string, password: string) {
  return apiCall("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export async function register(name: string, email: string, password: string) {
  return apiCall("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  })
}

export async function logout() {
  return apiCall("/api/auth/logout", { method: "POST" })
}

export async function getPosts(page = 1, limit = 10) {
  return apiCall(`/api/posts?page=${page}&limit=${limit}`)
}

export async function getPost(slug: string) {
  return apiCall(`/api/posts/${slug}`)
}

export async function getCategories() {
  return apiCall("/api/categories")
}

export async function getPostsByCategory(categorySlug: string, page = 1) {
  return apiCall(`/api/categories/${categorySlug}/posts?page=${page}`)
}

export async function getAuthor(slug: string) {
  return apiCall(`/api/authors/${slug}`)
}
