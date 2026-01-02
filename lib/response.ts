import { AppError } from "./errors"

export function successResponse<T>(data: T, statusCode = 200): Response {
  return Response.json(
    {
      success: true,
      data,
    },
    { status: statusCode },
  )
}

export function errorResponse(error: any, statusCode = 500): Response {
  if (error instanceof AppError) {
    return Response.json(
      {
        success: false,
        error: {
          message: error.message,
          code: error.code,
        },
      },
      { status: error.statusCode },
    )
  }

  const message = error instanceof Error ? error.message : "Internal server error"
  return Response.json(
    {
      success: false,
      error: {
        message,
        code: "ERROR",
      },
    },
    { status: statusCode },
  )
}

export function paginatedResponse<T>(
  data: T[],
  total: number,
  limit: number,
  offset: number,
  statusCode = 200,
): Response {
  return Response.json(
    {
      success: true,
      data,
      pagination: {
        total,
        limit,
        offset,
        pages: Math.ceil(total / limit),
      },
    },
    { status: statusCode },
  )
}
