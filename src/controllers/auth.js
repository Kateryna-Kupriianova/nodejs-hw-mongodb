import { registerUser } from "../services/auth.js";

export async function registerController(req, res) {
    const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    const registeredUser = await registerUser(payload);

    res.send({ status: 201, message: 'Successfully registered a user!', data: registeredUser });
}

