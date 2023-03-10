class HttpError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.code = code || 500;
  }
}

export default HttpError;
