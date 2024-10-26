import createHttpErrors from "http-errors";

export function validateBody(schema) {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            return next (createHttpErrors(400, "Request body is not valid"));
        }
        next();
    };
}
