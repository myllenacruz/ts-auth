import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "../models/User";

class UserController {
	async store(req: Request, res: Response) {
		try {
			const repository = getRepository(User);
			const { email, password } = req.body;

			const userExists = await repository.findOne({ where: { email } });

			if (userExists) {
				return res.status(409);
			}

			const user = repository.create({ email, password });
			await repository.save(user);

			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json({
				message: "Could not get users!",
				error
			});
		}
	}
}

export default new UserController();
