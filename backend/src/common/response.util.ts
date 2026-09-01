export function successResponse<T>(data: T, message: string, statusCode = 200) {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
}
