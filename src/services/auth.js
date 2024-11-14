import dotenv from "dotenv";
dotenv.config();

import crypto from "node:crypto";

import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import { User } from "../models/user.js";
import { Session } from "../models/session.js";

import jwt from "jsonwebtoken";


import { sendEmail } from "../utils/sendEmail.js";


import { TEMPLATES_DIR } from "../constants/index.js";
import path from "node:path";
import fs from "node:fs/promises";
import handlebars from "handlebars";


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

export async function requestResetToken (email) {
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



    const resetPasswordTemplatePath = path.join(TEMPLATES_DIR, "reset-password-email.html");
    let templateSource;

    try {
       templateSource =  await fs.readFile(resetPasswordTemplatePath, {encoding: "utf8"});
    } catch (error) {
        console.error("Template read error:", error);
        throw new Error("Failed to read template");
    }



    const template = handlebars.compile(templateSource);

    const html = template({
        name: user.name,
        link: `${process.env.APP_DOMAIN}/reset-password?token=${resetToken}`
    });

    try {
      await sendEmail({
        from: process.env.SMTP_FROM,
        to: user.email,
        subject: "Reset your password",
        html,
    });
    } catch (error) {
        console.error("Email send error:", error);
        throw new Error("Failed to send email");
    }


};



export async function resetPassword(token, password) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.sub, email: decoded.email });
        if(user===null) {
            throw createHttpError(404, 'User not found');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    } catch (error) {
           if (error.name === "TokenExpiredError"|| error.name === "JsonWebTokenError") {
              throw createHttpError(401, 'Token error');

           }
        throw error;


    }

}







