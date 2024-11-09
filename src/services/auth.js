import dotenv from "dotenv";
dotenv.config();

import crypto from "node:crypto";

import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import { User } from "../models/user.js";
import { Session } from "../models/session.js";

import jwt from "jsonwebtoken";
// import { SMTP } from "../constants/index.js";

import { sendEmail } from "../utils/sendEmail.js";

export  async function registerUser(payload) {
    const user = await User.findOne({ email: payload.email });

    if (user !== null) {
throw createHttpError(409, 'Email in use')
    }
    payload.password = await bcrypt.hash(payload.password, 10);
    return User.create(payload);
}

export async function loginUser(email, password) {
    const user = await User.findOne({ email });

    if (user === null) {
        throw createHttpError(401, 'Email or password is incorrect');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw createHttpError(401, 'Email or password is incorrect');
    }

    await Session.deleteOne({ userId: user._id });

    const accessToken = crypto.randomBytes(30).toString("base64");
    const refreshToken = crypto.randomBytes(30).toString("base64");

    return Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

}

export  function logoutUser(sessionId) {
    return Session.deleteOne({ _id: sessionId });
}

export async function refreshSession(sessionId, refreshToken) {
    const session = await Session.findById(sessionId);

    if (session === null) {
    throw createHttpError(401, 'Session not found');

    }

    if (session.refreshToken !== refreshToken) {
    throw createHttpError(401, 'Session not found');
    }

    if(new Date()>session.refreshTokenValidUntil) {

        throw createHttpError(401, 'Refresh token expired');
    }

    await Session.deleteOne({ _id: sessionId });



    return Session.create({
        userId: session.userId,
        accessToken: crypto.randomBytes(30).toString("base64"),
        refreshToken: crypto.randomBytes(30).toString("base64"),
        accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
        refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
}

export const requestResetToken = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    const resetToken = jwt.sign(
        {
            userId: user._id,
            email
        },
        process.env.JWT_SECRET,
        {
        expiresIn: "5m",
        },
    );


    await sendEmail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "Reset your password",
        html: `
            <h1>Reset your password</h1>
            <p>Click <a href="${process.env.APP_DOMAIN}/send-reset-email?token=${resetToken}">here</a> to reset your password</p>`,
    });
};






