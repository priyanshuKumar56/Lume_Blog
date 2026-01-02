export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode = 500,
    public code = "INTERNAL_ERROR",
  ) {
    super(message)
    this.name = "AppError"
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERROR")
    this.name = "ValidationError"
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "AUTHENTICATION_ERROR")
    this.name = "AuthenticationError"
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "AUTHORIZATION_ERROR")
    this.name = "AuthorizationError"
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, "NOT_FOUND")
    this.name = "NotFoundError"
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      error: {
        message: error.message,
        code: error.code,
      },
    }
  }

  console.error("[v0] Unexpected error:", error)
  return {
    statusCode: 500,
    error: {
      message: "Internal server error",
      code: "INTERNAL_ERROR",
    },
  }
}
