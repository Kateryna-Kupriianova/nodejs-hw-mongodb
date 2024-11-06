import mongoose from "mongoose";
import createHttpErrors from "http-errors";
export function isValidId(req, res, next) {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return next(createHttpErrors(400, 'Invalid ID'));
    }
    next();
}

