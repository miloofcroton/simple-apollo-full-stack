export const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'Server error';

  if (err instanceof HttpError) {
    status = err.code;
    message = err.message;
  }

  // console.log(err);

  res.status(status).json({ error: message });
};


export class HttpError extends Error {
  constructor({ code, message }) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
