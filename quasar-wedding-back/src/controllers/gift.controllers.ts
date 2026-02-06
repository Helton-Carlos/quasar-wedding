import { db } from "../db/database.js";
import type { Request, Response } from "express";
import type { Gift } from "../types/gift.js";

export async function registerGift(req: Request<Gift>, res: Response) {
  const { name, price, status, idGuest } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO gift (name, price, status, idGuest) VALUES (?, ?, ?, ?)",
    );

    const result = stmt.run(name, price, status, idGuest);

    res.status(201).json({
      message: "Presente criado com sucesso!",
      result,
    });
  } catch (error: any) {
    console.error("Erro ao criar presente:", error);

    if (error.message.includes("UNIQUE")) {
      res.status(409).json({ erro: "Email já cadastrado" });
      return;
    }

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function getAllGifts(_req: Request<Gift>, res: Response) {
  try {
    const result = db.prepare("SELECT * FROM gift").all();

    res.status(200).send({
      message: "Busca de presentes com sucesso!",
      data: result,
    });
  } catch (error: any) {
    console.error("Erro ao buscar presentes:", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}
