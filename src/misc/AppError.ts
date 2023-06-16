class AppError extends Error {
  httpCode: number;
  constructor(name: string, httpCode: number, description: string) {
    super(description);

    this.name = name;
    this.httpCode = httpCode;
    Error.captureStackTrace(this);
  }
}

export { AppError };
