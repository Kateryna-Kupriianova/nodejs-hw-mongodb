import { registerUser, loginUser, logoutUser, refreshSession } from "../services/auth.js";
import { requestResetToken} from "../services/auth.js";
import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { Session } from "../models/session.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export async function registerController(req, res) {
    const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const registeredUser = await registerUser(payload);

    res.send({ status: 201, message: 'Successfully registered a user!', data: registeredUser });
}


export async function loginController(req, res) {
    const { email, password } = req.body;

    const session = await loginUser(email, password);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,

    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,

    });

    res.send({status:200, message: 'Successfully logged in an user!', data: {accessToken: session.accessToken}});
}

export async function logoutController(req, res) {
    const { sessionId } = req.cookies;
if (typeof sessionId === 'string') {
await logoutUser(sessionId);
}
    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");
    res.status(204).end();
}

export async function refreshController(req, res) {
    const { sessionId, refreshToken } = req.cookies;

    const session = await refreshSession(sessionId, refreshToken);
     res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,

    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,

    });

    res.send({status:200, message: 'Successfully refreshed a session!', data: {accessToken: session.accessToken}});
    res.end();
}



export async function requestResetPasswordController(req, res, next) {
    try {
        const { email } = req.body;
        await requestResetToken(email);

    res.send({
        status: 200,
        message: 'Reset password email was successfully sent',
        data:{},
    });
    } catch (error) {
        if (error.status === 404) {
            return next(createHttpError(404, 'User not found'));
        }

        if (error.message === "Failed to send email") {
            return next(createHttpError(500, 'Failed to send email, try again later'));
        }
        return next(error);
    }



 };

export async function resetPasswordController(req, res, next) {

    try {
        const { token, password } = req.body;
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
                console.error("Token verification error:",error);
                return next(createHttpError(401, 'Token is expired or invalid.'));
            }


        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            throw createHttpError(404, 'User not found');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.updateOne(
            { _id: user._id },
            { password: encryptedPassword });
        await Session.deleteOne({ userId: user._id });

        res.status(200).json({
            status: 200,
            message: 'Password has been successfully reset.',
            data:{},
        });

    } catch (error) {
        console.error("Error in resetPasswordController:", error);
        next(createHttpError(500, 'Failed to reset password.'));

    }

}






