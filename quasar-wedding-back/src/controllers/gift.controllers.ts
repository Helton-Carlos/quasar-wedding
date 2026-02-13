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

export async function updatedGift(req: Request<Gift>, res: Response) {
  const { id } = req.params;
  const { name, price, status, idGuest } = req.body;

  try {
    const stmt = db.prepare(
      "UPDATE gift SET name = ?, price = ?, status = ?, idGuest = ? WHERE id = ?",
    );

    const result = stmt.run(name, price, status, idGuest, id);

    if (result.changes === 0) {
      res.status(404).json({ erro: "Presente não encontrado" });
      return;
    }

    res.status(200).json({
      message: "Presente atualizado com sucesso!",
      result,
    });
  } catch (error: any) {
    console.error("Erro ao atualizar presente:", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function deleteGift(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const stmt = db.prepare("DELETE FROM gift WHERE id = ?");
    const result = stmt.run(id as string);

    if (result.changes === 0) {
      res.status(404).json({ erro: "Presente não encontrado" });
      return;
    }

    res.status(200).json({
      message: "Presente deletado com sucesso!",
      result,
    });
  } catch (error: any) {
    console.error("Erro ao deletar presente:", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}
