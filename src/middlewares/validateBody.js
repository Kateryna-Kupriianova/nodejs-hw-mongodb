import createHttpErrors from "http-errors";


export function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(", ");
      return next(createHttpErrors(400, `Request body validation error: ${errorMessage}`));
    }

    next();
  };
}


// export function validateBody(schema) {
//     return (req, res, next) => {
//         const result = schema.validate(req.body);
//         if (result.error) {
//             return next (createHttpErrors(400, "Request body is not valid"));
//         }
//         next();
//     };
// }
