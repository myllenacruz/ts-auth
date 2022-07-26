import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

class AuthController {
	async authenticate(req: Request, res: Response) {
		try {
			const repository = getRepository(User);
			const { email, password } = req.body;

			if (!await repository.findOne({ where: { email } }))
				return res.sendStatus(401).json({ error: "User not found!" });

			if (!await bcrypt.compare(password, user.password))
				return res.sendStatus(401).json({ error: "Invalid password" });

			const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

			delete user.password;

			return res.status(200).json({ user, token });
		} catch (error) {
			return res.status(500).json({
				message: "Could not get user!",
				error
			});
		}
	}
}

export default new AuthController();
