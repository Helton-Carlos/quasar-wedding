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

export async function getAllUsers(_req: Request<User>, res: Response) {
  try {
    const result = db.prepare("SELECT * FROM user").all();

    res.status(200).send({
      message: "Busca de usuários com sucesso!",
      data: result,
    });
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function signIn(req: Request<User>, res: Response) {
  const { email, password } = req.body;

  try {
    const stmt = db.prepare(
      "SELECT * FROM user WHERE email = ? AND password = ?",
    );

    const user = stmt.get(email, password);
    delete user?.password;

    if (user) {
      res.status(200).json({
        message: "Login bem-sucedido!",
        user,
      });
    } else {
      res.status(401).json({ erro: "Credenciais inválidas" });
    }
  } catch (error: any) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}
