import { Request, Response, response } from "express";
import User from "../database/schemas/User";

class UserController {
  async find(req: Request, res: Response) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (error) {
      return res.status(500).json({
        error: "Erro inesperado, tente novamente mais tarde",
        message: error,
      })
    }
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Preencha todos os campos");
    }

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({
          error: "Erro",
          message: "Este e-mail já está em uso",
        });
      };

      const user = await User.create({
        name,
        email,
        password,
      });

      return res.json(user);
    } catch (error) {
      return res.status(500).json({
        error: "Registration failed",
        message: error,
      })
    }
  }
}

export default UserController;