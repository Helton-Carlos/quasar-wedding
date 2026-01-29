import { db } from "../db/database.js";
import type { Request, Response } from "express";
import type { User } from "../types/user.js";

export async function register(req: Request<User>, res: Response) {
  const { name, email, password } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
    );

    const result = stmt.run(name, email, password);

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      result,
    });
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);

    if (error.message.includes("UNIQUE")) {
      res.status(409).json({ erro: "Email já cadastrado" });
      return;
    }

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function getTest(req: Request<User>, res: Response) {
  try {
    res.status(200).send({
      message: "Busca de usuário com sucesso!",
      data: {
        name: "Helton Brito",
        email: "helton@gmail.com",
        password: "123457",
      },
    });
  } catch (error: any) {
    console.error("Erro ao buscar usuário:", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}
