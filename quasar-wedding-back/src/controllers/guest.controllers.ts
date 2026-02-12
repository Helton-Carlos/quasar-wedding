import { db } from "../db/database.js";
import type { Request, Response } from "express";
import type { Guest } from "../types/guest.js";

export async function registerGuest(req: Request<Guest>, res: Response) {
  const { name, email, phone, confirmed } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO guest (name, email, phone, confirmed) VALUES (?, ?, ?, ?)",
    );

    const result = stmt.run(name, email, phone, confirmed);

    res.status(201).json({
      message: "Convidado criado com sucesso!",
      result,
    });
  } catch (error: any) {
    console.error("Erro ao criar convidado:", error);

    if (error.message.includes("UNIQUE")) {
      res.status(409).json({ erro: "Email já cadastrado" });
      return;
    }

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function getGuest(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const stmt = db.prepare("SELECT * FROM guest WHERE id = ?");
    const guest = stmt.get(id as string);

    if (!guest) {
      res.status(404).json({ erro: "Convidado não encontrado" });
      return;
    }

    res.status(200).json({
      message: "Convidado encontrado com sucesso!",
      data: guest,
    });
  } catch (error: any) {
    console.error("Erro ao buscar convidado:", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function getAllGuests(_req: Request<Guest>, res: Response) {
  try {
    const result = db.prepare("SELECT * FROM guest").all();

    res.status(200).send({
      message: "Busca de convidados com sucesso!",
      data: result,
    });
  } catch (error: any) {
    console.error("Erro ao buscar convidados:", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}
