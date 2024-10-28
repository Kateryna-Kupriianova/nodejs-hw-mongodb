
import { isHttpError } from 'http-errors';

export function errorHandler(error, req, res, next) {
  if (isHttpError(error)) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      data: error.message || "Unknown error",
    });
  }


  next(error);
}

