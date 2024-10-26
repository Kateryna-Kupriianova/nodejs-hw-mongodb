import Joi from "joi";

export const contactSchema = Joi.object({
    name: Joi.string(). min(3). max(20).required(),
    phoneNumber: Joi.string(). min(3). max(20).required(),
    email: Joi.string().min(3). max(20). email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string(). min(3). max(20).valid("home", "personal"),
});
