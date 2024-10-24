// import {isHttpError} from 'http-errors';


// export function errorHandler(error, req, res, next) {

//     if (isHttpError(error) === true) {
//         return res
//             .status(error.statusCode)
//             .json({ status: error.statusCode, message: error.message,
//             });
        
//     }


//     console.error(error);
//       res.status(500).json({
// 		status: 500,
// 		message: "Something went wrong",
//           data: error || error.message,
//       });
    
    
//   }

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

  // Викликаємо next, щоб передати помилку далі, якщо потрібно
  next(error);
}

